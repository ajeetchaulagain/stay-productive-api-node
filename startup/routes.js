import express from 'express';
import cors from 'cors';
import error from '../middlewares/error';
import users from '../routes/users';
import auth from '../routes/auth';
import projects from '../routes/projects';
import tasks from '../routes/tasks';

export default (app) => {
  const corsOptions = {
    exposedHeaders: 'x-auth-token',
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/projects', projects);
  app.use('/api/tasks', tasks);
  app.use(error);
};
