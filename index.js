import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import { startDebug as debug } from './debugNamespaces/debug';
import error from './middlewares/error';

import users from './routes/users';
import auth from './routes/auth';

const app = express();

if (!config.get('jwtPrivateKey')) {
  debug('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}
// mongodb connection
mongoose
  .connect(config.get('db'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    debug('Connected to database');
  })
  .catch((err) => {
    debug('Could not connect to database', err);
  });

// middlewares

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  debug(`App is listening at ${PORT}`);
});
