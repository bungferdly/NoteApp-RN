export const getNotesApi = ({ page, limit }) => ({
  url: '/notes',
  params: { _page: page, _limit: limit, _sort: 'id', _order: 'desc' }
});
