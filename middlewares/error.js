// eslint-disable-next-line no-unused-vars
const error = (err, req, res, next) => {
  res.status(500).send('Internal Server Eror');
};

export default error;
