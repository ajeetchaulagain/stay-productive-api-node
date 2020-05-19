// eslint-disable-next-line arrow-body-style
const asyncMiddleware = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};

export default asyncMiddleware;
