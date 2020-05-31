import mongoose from 'mongoose';
import config from 'config';
import { infoLogger } from '../logger/logger';

export default () => {
  const db = config.get('db');
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      infoLogger.info(`Connected to ${db}...`);
    });
};
