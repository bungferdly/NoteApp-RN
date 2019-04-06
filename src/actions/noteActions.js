import { getNotesApi } from '../apis/noteApis';

export const noteActionTypes = {
  GET: 'note/GET',
  GETNEXT: 'note/GETNEXT'
};

const limit = 10;

export const getNotes = ({ isRefreshing = false } = {}) => ({
  type: noteActionTypes.GET,
  api: getNotesApi({ page: 1, limit }),
  isRefreshing,
  page: 1,
  limit
});

export const getNextNotes = ({ page }) => ({
  type: noteActionTypes.GETNEXT,
  api: getNotesApi({ page, limit }),
  showError: true,
  page,
  limit
});
