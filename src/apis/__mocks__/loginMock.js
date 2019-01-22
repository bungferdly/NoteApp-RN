export default {
  request: ({ url }) => url.match(/login/),
  response: ({ auth }) => {
    const isAuthenticated = auth.username == 'john' && auth.password == '1234';
    if (isAuthenticated) {
      return { data: { accessToken: 'mocktoken' } };
    } else {
      return { status: 401, data: { message: 'Username or password wrong.' } };
    }
  }
};
