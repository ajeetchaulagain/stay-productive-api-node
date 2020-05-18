import mongoose from 'mongoose';

const projectTaskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  dueDate: Date,
});

export default projectTaskSchema;
