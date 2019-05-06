import initialState from '../constants/initialState';
import actionTypes from '../constants/actionTypes';

export default function accountReducer(state = initialState.account, action) {
  switch (action.type) {
    case actionTypes.ACCOUNT_LOGIN:
      return {
        ...state,
        username: action.username,
        accessToken: action.isSuccess && action.data.accessToken
      };
    case actionTypes.ACCOUNT_LOGOUT:
      return {
        ...initialState,
        username: state.username
      };
    default:
      return state;
  }
}
