import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import { startDebug as debug } from './debugNamespaces/debug';

import users from './routes/users';

// debug namespaces

// middlewares
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// routes registration
app.use('/api/users', users);

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

app.listen(PORT, () => {
  debug(`App is listening at ${PORT}`);
});
