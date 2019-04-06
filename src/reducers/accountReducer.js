import { accountActionTypes } from '../actions/accountActions';

const initialState = {
  accessToken: null,
  username: null
};

export default function accountReducer(state, action) {
  switch (action.type) {
    case accountActionTypes.LOGIN:
      return {
        ...state,
        username: action.username,
        accessToken: action.isSuccess && action.data.accessToken
      };
    case accountActionTypes.LOGOUT:
      return {
        ...initialState,
        username: state.username
      };
    default:
      return state || initialState;
  }
}
