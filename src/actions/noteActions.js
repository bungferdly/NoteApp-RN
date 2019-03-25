import { getNotesApi } from '../apis/noteApis';

export const noteActionTypes = {
  GET: 'note/GET',
  GETNEXT: 'note/GETNEXT'
};

export const getNotes = ({ isRefreshing = false, limit = 10 } = {}) => ({
  type: noteActionTypes.GET,
  api: getNotesApi({ page: 1, limit }),
  isRefreshing,
  page: 1,
  limit
});

export const getNextNotes = ({ page, limit = 10 }) => ({
  type: noteActionTypes.GETNEXT,
  api: getNotesApi({ page, limit }),
  showError: true,
  page,
  limit
});
