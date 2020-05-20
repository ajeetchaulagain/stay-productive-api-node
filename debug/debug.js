import debug from 'debug';

// This is just a list of debug namespace to use for 'debug' npm package.
const usersRouteDebug = debug('app:usersRoute');
const startDebug = debug('app:start');
const projectsRouteDebug = debug('app:projectsRoute');

export { usersRouteDebug, startDebug, projectsRouteDebug };
