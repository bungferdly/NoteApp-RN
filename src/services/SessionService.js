import { cancelAllRequests } from './ApiService';
import { navigation } from './NavigationService';
import { accountActionTypes } from '../actions/accountActions';

export const sessionMiddleware = store => next => action => {
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
