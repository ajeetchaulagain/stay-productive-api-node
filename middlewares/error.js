import winstonLogger from '../logger/logger';

const error = (err, req, res) => {
  winstonLogger.error(err.message, err);
  res.status(500).send('Internal Server Eror');
};

export default error;
