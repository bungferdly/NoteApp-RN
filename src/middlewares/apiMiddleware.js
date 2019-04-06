import api from '../utils/apiUtils';

const apiMiddleware = store => next => action => {
  if (action.api) {
    return api.request(action);
  }
  return next(action);
};

export default apiMiddleware;
