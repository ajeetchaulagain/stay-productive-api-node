import 'express-async-errors';
import { transports, exceptions } from 'winston';

export default () => {
  // process uncaughtException handling through winston
  exceptions.handle([
    new transports.File({ filename: 'uncaughtExceptions.json' }),
    new transports.Console(),
  ]);
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
};
