import mongoose from 'mongoose';
import config from 'config';
import { infoLogger } from '../logger/logger';

export default () => {
  mongoose
    .connect(config.get('db'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      infoLogger.info('Connected to MongoDB Database');
    });
};
