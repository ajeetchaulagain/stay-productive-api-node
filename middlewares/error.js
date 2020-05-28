import winstonLogger from '../startup/logging';

// eslint-disable-next-line no-unused-vars
const error = (err, req, res, next) => {
  winstonLogger.error(err.message, err);
  res.status(500).send('Internal Server Eror');
};

export default error;
