import { accountActionTypes } from '../actions/accountActions';

const initialState = {
  accessToken: null,
  username: null
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case accountActionTypes.LOGIN_API:
      return {
        ...state,
        username: action.api.auth.username,
        accessToken: action.isSuccess && action.data.accessToken
      };
    case accountActionTypes.LOGOUT:
      return {
        ...initialState,
        username: state.username
      };
    default:
      return state;
  }
}
