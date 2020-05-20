import { Router } from 'express';
import { projectsRouteDebug as debug } from '../debug/debug';
import auth from '../middlewares/auth';
import { User } from '../models/user';
import { validateProject } from '../models/project';

const router = Router();

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send('No such user exist');
  debug(user);

  if (user.projects.length === 0) {
    return res.status(404).send('No any projects');
  }
  return res.send(user.projects);
});

router.post('/', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send('No such user exist');

  const { error } = validateProject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { projects } = user;
  const project = projects.find((p) => p.name === req.body.name);

  if (project) {
    return res.status(400).send(`${project.name} already exist`);
  }

  user.projects.push(req.body);
  await user.save();

  return res.send(user);
});

router.delete('/:id', async (req, res) => {
  res.send('Hello there');
});

router.put('/:id', (req, res) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  return res.send(true);
});

export default router;
