import { loginApi } from '../apis/accountApis';
import { NavigationActions } from 'react-navigation';
import actionTypes from '../constants/actionTypes';
import store from '../utils/storeUtils';
import navigation from '../utils/navigationUtils';
import api from '../utils/apiUtils';

export const resetTopScreen = () => {
  const token = store.getState().account.accessToken;
  navigation.reset([NavigationActions.navigate({ routeName: token ? 'Home' : 'Login' })]);
};

export const login = ({ username, password }) =>
  api
    .request({
      type: actionTypes.ACCOUNT_LOGIN,
      api: loginApi({ username, password }),
      loadingMessage: 'Logging in...',
      successMessage: 'Logged in!',
      showError: true,
      username
    })
    .then(resetTopScreen);

export const logout = () => {
  store.dispatch({ type: actionTypes.ACCOUNT_LOGOUT });
  resetTopScreen();
};
