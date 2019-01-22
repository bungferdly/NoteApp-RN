import axios from 'axios';
import { Keyboard, Platform } from 'react-native';
import { store } from './ReduxService';
import ActivityOverlay from '../components/ActivityOverlay';
import { logoutAction } from '../actions/accountActions';
import envUtils from '../utils/envUtils';

let mockClient;

if (__DEV__) {
  //show request in debugger
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

  //only mock in debug build, so when release the codes isn't transpiled
  mockClient = require('../apis/__mocks__/index').default;
}

let cancelSource = axios.CancelToken.source();

const client = axios.create({
  baseURL: envUtils.select({
    prod: 'https://production.url.com/api',
    default: Platform.select({
      ios: 'http://localhost:3000',
      android: 'http://10.0.2.2:3000' //your pc ip address is 10.0.2.2 in android emulator
    })
  })
});

function getErrorMessage(err) {
  let errMsg;
  ['response.data.message', 'message'].some(path => {
    let msg = err;
    let keys = path.split('.');
    while (keys.length && msg) {
      msg = msg[keys[0]];
      keys.shift();
    }
    if (typeof msg == 'string') {
      errMsg = msg;
      return true;
    }
    return false;
  });
  return errMsg || 'Server error.';
}

export function cancelAllRequests() {
  cancelSource.cancel('Operation canceled by the user.');
  cancelSource = axios.CancelToken.source();
}

export function apiRequest({
  type,
  api,
  isRefreshing = false,
  loadingMessage,
  successMessage,
  showError,
  ...otherParams
}) {
  if (loadingMessage) {
    Keyboard.dismiss();
    ActivityOverlay.showLoading(loadingMessage);
  }

  const token = store.getState().account.accessToken;
  client.defaults.headers['x-access-token'] = token;

  if (type) {
    store.dispatch({
      type,
      api,
      isLoading: true,
      isRefreshing,
      isSuccess: false,
      ...otherParams
    });
  }

  return envUtils
    .select({
      dev: mockClient || client,
      default: client
    })
    .request({ ...api, cancelToken: cancelSource.token })
    .then(res => {
      const data = res.data;
      if (type) {
        store.dispatch({
          type,
          api,
          isLoading: false,
          isRefreshing: false,
          isSuccess: true,
          headers: res.headers,
          data,
          ...otherParams
        });
      }
      if (successMessage) {
        ActivityOverlay.showSuccess(successMessage);
      } else if (loadingMessage) {
        ActivityOverlay.hide();
      }
      return data;
    })
    .catch(err => {
      const errorMessage = getErrorMessage(err);
      if ((err.response || {}).status == 403) {
        const onPress = () => {
          store.dispatch(logoutAction());
        };
        if (token) {
          ActivityOverlay.showError('Your session is expired, please relogin.', {
            title: 'Session Expired',
            buttons: [{ text: 'Relogin', style: 'cancel', onPress }]
          });
        } else {
          ActivityOverlay.showError('Login to access this app.', {
            title: 'Login Required',
            buttons: [{ text: 'Login', style: 'cancel', onPress }]
          });
        }
      } else if (showError) {
        ActivityOverlay.showError(errorMessage);
      } else if (loadingMessage) {
        ActivityOverlay.hide();
      }
      if (type) {
        store.dispatch({
          type,
          api,
          isLoading: false,
          isRefreshing: false,
          isSuccess: false,
          errorMessage,
          ...otherParams
        });
      }
      throw errorMessage;
    });
}
