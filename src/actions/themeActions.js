import store from '../utils/storeUtils';
import actionTypes from '../constants/actionTypes';

export const toggleTheme = () => {
  const theme = store.getState().theme.value;
  setThemeValue(theme == 'dark' ? 'default' : 'dark');
};

export const setThemeValue = payload =>
  store.dispatch({
    type: actionTypes.THEME_SETVALUE,
    payload
  });
