import express from 'express';
import initializeRoutes from './startup/routes';
import initializeDatabase from './startup/db';
import initializeLogging from './startup/logging';
import initializeConfig from './startup/config';

const app = express();

initializeLogging();
initializeRoutes(app);
initializeDatabase();
initializeConfig();

// Just exporting app without listening for test environment
export default app;
