const mocks = [require('./loginMock'), require('./noteGetMock')];

const defaultMock = {
  default: {
    response: () => ({ data: {} })
  }
};

let mockResponse;

const mockClient = {
  defaults: { headers: {} },
  mockResponse: resp => (mockResponse = resp),
  request: api =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        let mock = (mocks.find(m => m.default.request(api)) || defaultMock).default;
        let { data, status = 200, headers } = mockResponse || mock.response(api);
        if (status >= 200 && status < 400) {
          resolve({ data, status, headers });
        } else {
          const error = Error();
          error.response = { data, status, headers };
          reject(error);
        }
      }, 1000);
    })
};

export default mockClient;
