import { Router } from 'express';
import { userRoutesDebug as debug } from '../debugNamespaces/debug';
import { User, validateUser } from '../models/user';
import pick from '../util/pick-object-property';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hi there');
});

// user registration route
router.post('/', async (req, res) => {
  debug(`${req.method} ${req.url}`);

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  debug(user);
  if (user) return res.status(400).send('Email already exist');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    projects: null,
  });
  const result = await user.save();
  return res.send(pick(result, ['name', 'email']));
});

export default router;
