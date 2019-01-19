import { getNotesApi } from '../apis/noteApis';

export const noteActionTypes = {
  GET_API: 'note/GET_API',
  GETNEXT_API: 'note/GETNEXT_API'
};

export const getNotesApiAction = ({ isRefreshing = false, limit = 10 } = {}) => ({
  type: noteActionTypes.GET_API,
  api: getNotesApi({ page: 1, limit }),
  isRefreshing,
  page: 1,
  limit
});

export const getNextNotesApiAction = ({ page, limit = 10 }) => ({
  type: noteActionTypes.GETNEXT_API,
  api: getNotesApi({ page, limit }),
  showError: true,
  page,
  limit
});
