import { Router } from 'express';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import { User } from '../models/user';

const router = Router();

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().max(1024),
  });
  return schema.validate(req);
};

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.send(400).send('Invalid email or password');

  // eslint-disable-next-line no-underscore-dangle
  const token = user.generateAuthToken();
  return res.send(token);
});

export default router;
