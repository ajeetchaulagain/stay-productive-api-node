import winston from 'winston';
import 'winston-mongodb';
import config from 'config';

export default winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.File({
      filename: 'logfile.log',
    }),
    new winston.transports.Console(),
    new winston.transports.MongoDB({ db: config.get('logDB') }),
  ],
});

export const infoLogger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
});
