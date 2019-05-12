import initialState from '../constants/initialState';
import actionTypes from '../constants/actionTypes';

export default function noteReducer(state = initialState.note, action) {
  switch (action.type) {
    case actionTypes.NOTE_GET:
      return {
        ...state,
        data: action.data || state.data,
        isLoading: action.isLoading,
        isRefreshing: action.isRefreshing,
        errorMessage: action.errorMessage,
        currentPage: 1,
        canLoadNext: action.isSuccess && action.data.length >= action.limit
      };
    case actionTypes.NOTE_GETNEXT:
      return {
        ...state,
        data: action.data ? [...state.data, ...action.data] : state.data,
        currentPage: action.page,
        isLoadingNext: action.isLoading,
        canLoadNext: action.isSuccess && action.data.length >= action.limit
      };
    case actionTypes.ACCOUNT_LOGOUT:
      return initialState.note;
    default:
      return state;
  }
}
