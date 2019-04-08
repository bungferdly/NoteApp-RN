import { themeActionTypes } from '../actions/themeActions';

const initialState = {
  value: 'default'
};

export default function themeReducer(state, action) {
  switch (action.type) {
    case themeActionTypes.SET_VALUE:
      return {
        ...state,
        value: action.payload
      };
    default:
      return state || initialState;
  }
}
