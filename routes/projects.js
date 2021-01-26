import { Router } from 'express';
import { projectsRouteDebug as debug } from '../debug/debug';
import auth from '../middlewares/auth';
import { User } from '../models/user';
import { validateProject } from '../models/project';
import { validateObjectId } from '../middlewares/validateObjectId';

const router = Router();

// Get all the projects for logged in user
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.projects.length === 0) {
    return res.status(404).send('No any projects');
  }
  return res.send(user.projects);
});

// Create a project for logged in user
router.post('/', auth, async (req, res) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).send('User is not authorized');

  const { projects } = user;
  let project = projects.find((p) => p.name === req.body.name);
  if (project) return res.status(400).send(`${project.name} already exist`);

  project = user.projects.create(req.body);
  user.projects.push(project);
  await user.save();
  debug(project);

  return res.send(project);
});

// update the project with id of 'id'
router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  const { projects } = user;

  const project = user.projects.id(req.params.id);
  if (!project) return res.status(400).send('Given project doesnt exist');

  const projectInDB = projects.find((p) => {
    return p.name === req.body.name && p._id !== req.params.id;
  });

  if (projectInDB)
    return res.status(400).send(`${req.body.name} already exist`);

  project.name = req.body.name;
  await user.save();

  return res.send(project);
});
// Delete the project of id 'id'
router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  const user = await User.findById(req.user._id);

  const project = user.projects.id(req.params.id);
  if (!project) return res.status(404).send('Given project doesnt exist');
  project.remove();
  await user.save();

  return res.send(project);
});

export default router;
