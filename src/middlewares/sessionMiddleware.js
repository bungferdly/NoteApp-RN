import { cancelAllRequests } from '../utils/apiUtils';
import { navigation } from '../utils/navigationUtils';
import { accountActionTypes } from '../actions/accountActions';

const sessionMiddleware = store => next => action => {
  const result = next(action);

  switch (action.type) {
    case accountActionTypes.LOGIN_API:
      if (action.isSuccess) {
        navigation.navigate('App');
      }
      break;
    case accountActionTypes.LOGOUT:
      navigation.navigate('Login');
      cancelAllRequests();
      break;
  }

  return result;
};

export default sessionMiddleware;
