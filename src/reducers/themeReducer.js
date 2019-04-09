import { themeActionTypes } from '../actions/themeActions';
import initialState from '../constants/initialState';

export default function themeReducer(state, action) {
  switch (action.type) {
    case themeActionTypes.SET_VALUE:
      return {
        ...state,
        value: action.payload
      };
    default:
      return state || initialState.theme;
  }
}
