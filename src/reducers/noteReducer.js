import { noteActionTypes } from '../actions/noteActions';
import { accountActionTypes } from '../actions/accountActions';
import initialState from '../constants/initialState';

export default function noteReducer(state, action) {
  switch (action.type) {
    case noteActionTypes.GET:
      return {
        ...state,
        data: action.data || state.data,
        isLoading: action.isLoading,
        isRefreshing: action.isRefreshing,
        errorMessage: action.errorMessage,
        currentPage: 1,
        canLoadNext: action.isSuccess && action.data.length >= action.limit
      };
    case noteActionTypes.GETNEXT:
      return {
        ...state,
        data: action.data ? [...state.data, ...action.data] : state.data,
        currentPage: action.page,
        isLoadingNext: action.isLoading,
        canLoadNext: action.isSuccess && action.data.length >= action.limit
      };
    case accountActionTypes.LOGOUT:
      return initialState;
    default:
      return state || initialState.note;
  }
}
