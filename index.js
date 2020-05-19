import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import { startDebug as debug } from './debugNamespaces/debug';
import error from './middlewares/error';

import users from './routes/users';

// debug namespaces

// mongodb connection
mongoose
  .connect(config.get('db'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    debug('Connected to database');
  })
  .catch((err) => {
    debug('Could not connect to database', err);
  });

// middlewares

const app = express();
app.use(express.json());
app.use('/api/users', users);

app.use(error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  debug(`App is listening at ${PORT}`);
});
