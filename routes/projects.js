import { Router } from 'express';
import { projectsRouteDebug as debug } from '../debug/debug';
import auth from '../middlewares/auth';
import { User } from '../models/user';
import { validateProject } from '../models/project';
import { validateObjectId } from '../middlewares/validateObjectId';

const router = Router();

// Get all tasks for a project with id - projectID
router.get('/:projectID', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.projects.length === 0) {
    return res.status(404).send('No any projects');
  }
  return res.send(user.projects);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);

  const { projects } = user;
  let project = projects.find((p) => p.name === req.body.name);
  if (project) return res.status(400).send(`${project.name} already exist`);

  project = user.projects.create(req.body);
  user.projects.push(project);
  await user.save();
  debug(project);

  return res.send(project);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);

  const project = user.projects.id(req.params.id);
  if (!project) return res.status(400).send('Given project doesnt exist');

  project.name = req.body.name;
  await user.save();

  return res.send(project);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  const user = await User.findById(req.user._id);

  const project = user.projects.id(req.params.id);
  if (!project) return res.status(404).send('Given project doesnt exist');
  project.remove();
  await user.save();

  return res.send(project);
});

export default router;
