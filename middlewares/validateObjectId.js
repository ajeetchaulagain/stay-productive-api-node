import mongoose from 'mongoose';

// This method will be used if there is just one route parameter
// for accepting mongoose object id

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID.');
  }
  return next();
};

// For validating projectID route parameter in tasks route
const validateProjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.projectID)) {
    return res.status(404).send('Invalid Project ID.');
  }
  return next();
};

export { validateObjectId, validateProjectId };
