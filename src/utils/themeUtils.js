const themeActionTypes = {
  SET: 'theme/SET'
};

const setThemeValue = payload => ({
  type: themeActionTypes.SET,
  payload
});

function select(values) {
  return values[theme.value];
}

function useValue() {
  const store = require('./storeUtils').default;
  store.useState(s => s._theme);
}

function setValue(value) {
  const store = require('./storeUtils').default;
  theme.value = value;
  store.dispatch(setThemeValue(value));
}

const theme = {
  value: 0,
  select,
  useValue,
  setValue
};

export function themeReducer(state, action) {
  switch (action.type) {
    case themeActionTypes.SET:
      return action.payload;
    default:
      return state || 0;
  }
}

export default theme;
