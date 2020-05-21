import debug from 'debug';

// This is just a list of debug namespace to use for 'debug' npm package.
const usersRouteDebug = debug('app:usersRoute');
const startDebug = debug('app:start');
const projectsRouteDebug = debug('app:projectsRoute');
const tasksRouteDebug = debug('app:tasksRoute');

// eslint-disable-next-line object-curly-newline
export { usersRouteDebug, startDebug, projectsRouteDebug, tasksRouteDebug };
