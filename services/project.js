import { User } from '../models/user';

const createProject = async (userId, inputProject) => {
  const user = await User.findById(userId);
  const { projects } = user;

  let project = projects.find((p) => p.name === inputProject.name);
  if (project) return Promise.resolve({ msg: 'project already exist' });

  project = user.projects.create(project);
  await user.save();

  return project;
};

export default createProject;
