export const themeActionTypes = {
  SET_VALUE: 'theme/SET_VALUE'
};

export const setThemeValue = payload => ({
  type: themeActionTypes.SET_VALUE,
  payload
});
