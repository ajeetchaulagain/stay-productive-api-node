// import mongoose from 'mongoose';
import { Router } from 'express';
import auth from '../middlewares/auth';
import {
  validateProjectId,
  validateObjectId,
} from '../middlewares/validateObjectId';
import { User } from '../models/user';
import { validateTask } from '../models/task';
import { tasksRouteDebug as debug } from '../debug/debug';

const router = Router();

// Gets all the task for provided project id in route parameter
router.get('/:projectID', [auth, validateProjectId], async (req, res) => {
  const user = await User.findById(req.user._id);
  debug(req.params);
  const project = user.projects.id(req.params.projectID);
  if (!project) return res.status(404).send("Given project doesn't exist");

  return res.send(project.tasks);
});

// Creates the task for a project with given id.
router.post('/:projectID', [auth, validateProjectId], async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  debug(req.params);

  const { projects } = user;
  const project = projects.id(req.params.projectID);
  if (!project) return res.status(404).send("Given project doesn't exist");
  debug(project);

  const { tasks } = project;
  const task = tasks.create(req.body);

  tasks.push(task);
  await user.save();
  return res.send(task);
});

// update task with id in a project with projectID
router.put('/:projectID/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  const { projects } = user;
  const project = projects.id(req.params.projectID);
  if (!project) return res.status(404).send("Given project doesn't exist");

  const { tasks } = project;
  const task = tasks.id(req.params.id);
  if (!task) return res.status(404).send('Task with given ID was not found');

  task.name = req.body.name;
  if (req.body.completed) task.completed = req.body.completed;
  if (req.body.dueDate) task.dueDate = req.body.dueDate;

  await user.save();
  debug('task->', task);

  return res.send(task);
  // eslint-disable-next-line comma-dangle
});

router.delete('/:projectID/:id', [auth, validateObjectId], async (req, res) => {
  const user = await User.findById(req.user._id);

  const { projects } = user;
  const project = projects.id(req.params.projectID);
  if (!project) return res.status(404).send("Given project doesn't exist");

  const { tasks } = project;
  const task = tasks.id(req.params.id);
  if (!task) return res.status(404).send('Task with given ID was not found');
  task.remove();

  const result = await user.save();

  return res.send(result);
});

export default router;
