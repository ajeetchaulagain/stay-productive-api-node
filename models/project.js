import mongoose from 'mongoose';
import projectTaskSchema from './task';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [projectTaskSchema],
});

export default projectSchema;
