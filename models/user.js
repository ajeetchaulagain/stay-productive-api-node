import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from 'config';
import Joi from '@hapi/joi';
import { projectSchema } from './project';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 55,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  projects: [projectSchema],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const userValidationSchema = Joi.object({
    name: Joi.string().required().max(55),
    email: Joi.string().required().max(255),
    password: Joi.string().required().max(1024),
  });
  return userValidationSchema.validate(user);
};

export { User, validateUser };
