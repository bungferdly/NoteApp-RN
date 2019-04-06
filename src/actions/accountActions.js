import { loginApi } from '../apis/accountApis';

export const accountActionTypes = {
  LOGIN: 'account/LOGIN',
  LOGOUT: 'account/LOGOUT'
};

export const login = ({ username, password }) => ({
  type: accountActionTypes.LOGIN,
  api: loginApi({ username, password }),
  loadingMessage: 'Logging in...',
  successMessage: 'Logged in!',
  showError: true,
  username
});

export const logout = () => ({
  type: accountActionTypes.LOGOUT
});
