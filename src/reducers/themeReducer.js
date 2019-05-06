import initialState from '../constants/initialState';
import actionTypes from '../constants/actionTypes';

export default function themeReducer(state = initialState.theme, action) {
  switch (action.type) {
    case actionTypes.THEME_SETVALUE:
      return {
        ...state,
        value: action.payload
      };
    default:
      return state;
  }
}
