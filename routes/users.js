import { Router } from 'express';
import bcrypt from 'bcrypt';
import { usersRouteDebug as debug } from '../debug/debug';
import { User, validateUser } from '../models/user';
import auth from '../middlewares/auth';
import pick from '../util/pick-object-property';

const router = Router();

// Registering User
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Email already exist');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  return res
    .header('x-auth-token', token)
    .send(pick(user, ['_id', 'name', 'email']));
});

// Assumption : decided not to pass user ID from client side
// for security purpose. Instead id will be retrieved from JWT Payload
router.delete('/delete', auth, async (req, res) => {
  const user = await User.findByIdAndRemove(req.user._id);
  if (!user) return res.status(400).send('No such user exist');
  debug('Deleted User:', user);
  return res.send(pick(user, ['name', 'email']));
});

export default router;
