import { getNotesApi } from '../apis/noteApis';
import actionTypes from '../constants/actionTypes';
import api from '../utils/apiUtils';

const limit = 10;

export const getNotes = ({ isRefreshing = false } = {}) =>
  api.request({
    type: actionTypes.NOTE_GET,
    api: getNotesApi({ page: 1, limit }),
    isRefreshing,
    page: 1,
    limit
  });

export const getNextNotes = ({ page }) =>
  api.request({
    type: actionTypes.NOTE_GETNEXT,
    api: getNotesApi({ page, limit }),
    showError: true,
    page,
    limit
  });
