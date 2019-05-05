import { loginApi } from '../apis/accountApis';
import { NavigationActions } from 'react-navigation';

export const accountActionTypes = {
  LOGIN: 'account/LOGIN',
  LOGOUT: 'account/LOGOUT'
};

export const resetTopScreen = () => ({ getState, navigation }) => {
  const token = getState().account.accessToken;
  navigation.reset([NavigationActions.navigate({ routeName: token ? 'Home' : 'Login' })]);
};

export const login = ({ username, password }) => ({ dispatch }) =>
  dispatch({
    type: accountActionTypes.LOGIN,
    api: loginApi({ username, password }),
    loadingMessage: 'Logging in...',
    successMessage: 'Logged in!',
    showError: true,
    username
  }).then(() => {
    dispatch(resetTopScreen());
  });

export const logout = () => ({ dispatch }) => {
  dispatch({ type: accountActionTypes.LOGOUT });
  dispatch(resetTopScreen());
};
