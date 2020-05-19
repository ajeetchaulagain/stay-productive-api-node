import jwt from 'jsonwebtoken';
import config from 'config';

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Unauthorized. No token provided');

  try {
    const payload = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = payload;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

export default auth;
