import { request } from '../utils/apiUtils';

const apiMiddleware = store => next => action => {
  if (action.api) {
    return request(action);
  }
  return next(action);
};

export default apiMiddleware;
