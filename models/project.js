import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import projectTaskSchema from './task';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 55,
  },
  tasks: [projectTaskSchema],
});

const validateProject = (project) => {
  const projectValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(55),
  });
  return projectValidationSchema.validate(project);
};

export { projectSchema, validateProject };
