import { loginApi } from '../apis/accountApis';

export const accountActionTypes = {
  LOGIN_API: 'account/LOGIN_API',
  LOGOUT: 'account/LOGOUT'
};

export const loginApiAction = ({ username, password }) => ({
  type: accountActionTypes.LOGIN_API,
  api: loginApi({ username, password }),
  loadingMessage: 'Logging in...',
  successMessage: 'Logged in!',
  showError: true
});

export const logoutAction = () => ({
  type: accountActionTypes.LOGOUT
});
