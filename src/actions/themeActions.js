export const themeActionTypes = {
  SET_VALUE: 'theme/SET_VALUE'
};

export const toggleTheme = () => ({ getState, dispatch }) => {
  const theme = getState().theme.value;
  dispatch(setThemeValue(theme == 'dark' ? 'default' : 'dark'));
};

export const setThemeValue = payload => ({
  type: themeActionTypes.SET_VALUE,
  payload
});
