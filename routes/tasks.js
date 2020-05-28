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

// Route for getting all the task of particular project
router.get('/:projectId', [auth, validateProjectId], async (req, res) => {
  const user = await User.findById(req.user._id);
  debug(req.params);
  const project = user.projects.id(req.params.projectId);
  if (!project) return res.status(404).send("Given project doesn't exist");
  return res.send(project.tasks);
});

// Route for creating task
router.post('/:projectId', [auth, validateProjectId], async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);

  // Checking if project exist or not
  const { projects } = user;
  const project = projects.id(req.params.projectId);
  if (!project) return res.status(404).send("Given project doesn't exist");

  // Creating task
  const { tasks } = project;
  const task = tasks.create(req.body);
  debug('task', task);

  tasks.push(task);
  await user.save();
  return res.send(task);
});

// Route for updating the task of particular project
router.put('/:projectId/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if project exist
  const user = await User.findById(req.user._id);
  const { projects } = user;
  const project = projects.id(req.params.projectId);
  if (!project) return res.status(404).send("Given project doesn't exist");

  // Check if task for that project exist
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

// Route for deleting the task
router.delete('/:projectId/:id', [auth, validateObjectId], async (req, res) => {
  const user = await User.findById(req.user._id);

  const { projects } = user;

  const project = projects.id(req.params.projectId);
  if (!project) return res.status(404).send("Given project doesn't exist");

  const { tasks } = project;
  const task = tasks.id(req.params.id);
  if (!task) return res.status(404).send('Task with given Id was not found');
  task.remove();

  await user.save();

  return res.send(task);
});

export default router;
