import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const projectTaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 55,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const validateTask = (task) => {
  const taskValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(55),
    completed: Joi.boolean().required(),
    dueDate: Joi.date(),
  });
  return taskValidationSchema.validate(task);
};

export { projectTaskSchema, validateTask };
