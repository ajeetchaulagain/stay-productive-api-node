import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import debug from 'debug';

// debug namespaces
const startDebug = debug('app:index');

// Middlewares
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// Connecting to local mongodb
mongoose
  .connect(config.get('db'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    startDebug('Connected to database');
  })
  .catch((err) => {
    startDebug('Could not connect to database', err);
  });

// projectSchema

const projectTaskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  dueDate: Date,
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [projectTaskSchema],
});

// Creating userSchema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 55,
  },
  email: {
    type: String,
    required: true,
    maxlength: 55,
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

// Creatig user model from schema
const User = mongoose.model('User', userSchema);

const user = new User({
  name: 'Ajeet',
  email: 'test@gmail.com',
  password: '12345',
  projects: null,
});

// const createUser = async () => {
//   try {
//     await user2.save();
//   } catch (er) {
//     startDebug(JSON.stringify(er));
//   }
// };

// Routes
app.post('/api/users', async (req, res) => {
  startDebug('Inside post route handler');

  startDebug('type of isVerified', typeof req.body.isVerified);

  const user2 = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isVerified: req.body.isVerified,
    projects: null,
  });

  try {
    const result = await user2.save();
    startDebug('post result: ', result);
  } catch (er) {
    startDebug(JSON.stringify(er));
  }

  res.send({ updated: true });
});

// App listening
app.listen(PORT, () => {
  startDebug(`App is listening at ${PORT}`);
});
