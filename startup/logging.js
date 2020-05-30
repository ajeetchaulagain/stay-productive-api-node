import 'express-async-errors';
import { transports, exceptions, format } from 'winston';

export default () => {
  // process uncaughtException handling through winston
  exceptions.handle([
    new transports.File({ filename: 'uncaughtExceptions.log' }),
    new transports.Console({
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        // eslint-disable-next-line comma-dangle
        format.simple()
      ),
    }),
  ]);
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
};
