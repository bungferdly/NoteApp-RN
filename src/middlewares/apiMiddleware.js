const apiMiddleware = () => next => action => {
  if (action.api) {
    return require('../utils/apiUtils').default.request(action);
  }
  return next(action);
};

export default apiMiddleware;
