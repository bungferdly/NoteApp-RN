const initialState = {
  account: {
    accessToken: null,
    username: null
  },
  note: {
    data: null,
    errorMessage: null,
    isLoading: false,
    isRefreshing: false,
    isLoadingNext: false,
    canLoadNext: false,
    currentPage: 1
  },
  theme: {
    value: 'default'
  }
};

export default initialState;
