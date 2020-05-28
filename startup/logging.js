import winston from 'winston';

export default winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.File({
      filename: 'logfile.log',
    }),
    new winston.transports.Console(),
  ],
});
