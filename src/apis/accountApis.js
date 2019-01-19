export const loginApi = ({ username, password }) => ({
  url: '/login',
  method: 'post',
  auth: { username, password }
});
