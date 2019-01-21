const mocks = [
  require('./loginMock'),
  require('./noteGetMock'),
  require('./defaultMock') //put default mock at the end in case the other mocks failing
];

export default {
  request: api => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let mock = mocks.find(m => m.default.request(api)).default;
        let { data, status = 200, headers } = mock.response(api);
        if (status >= 200 && status < 400) {
          resolve({ data, status, headers });
        } else {
          const error = Error('Error');
          error.response = { data, status, headers };
          reject(error);
        }
      }, 2000);
    });
  }
};
