import axios from 'axios';
import { Keyboard, Platform } from 'react-native';
import { logout } from '../../actions/accountActions';
import env from '../envUtils';
import activity from '../activityUtils';

const client = env.select({
  dev: __DEV__ && require('../../apis/__mocks__/index').default,
  default: axios.create({
    baseURL: env.select({
      prod: 'https://production.url.com/api',
      default: Platform.select({
        ios: 'http://localhost:3000',
        android: 'http://10.0.2.2:3000' // your pc ip address is 10.0.2.2 in android emulator
      })
    })
  })
});

// show request in debugger
__DEV__ && (GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest);

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
  return errMsg || 'We encountered a problem.';
}

const request = async ({
  type,
  api,
  isRefreshing = false,
  loadingMessage,
  successMessage,
  showError,
  ...otherParams
}) => {
  const { getState, dispatch } = require('../storeUtils').default;
  if (loadingMessage) {
    Keyboard.dismiss();
    activity.loading(loadingMessage);
  }
  const token = getState().account.accessToken;
  client.defaults.headers['x-access-token'] = token;
  if (type) {
    dispatch({
      type,
      isLoading: true,
      isRefreshing,
      isSuccess: false,
      ...otherParams
    });
  }
  let res, err;
  try {
    res = await client.request(api);
  } catch (error) {
    err = error;
  }
  if (loadingMessage) {
    activity.hide();
  }
  if (token && !getState().account.accessToken) {
    throw 'User logged out.';
  }
  const errorMessage = err && getErrorMessage(err);
  const { data, headers } = res || {};
  if (type) {
    dispatch({
      type,
      isLoading: false,
      isRefreshing: false,
      isSuccess: !!res,
      headers,
      data,
      errorMessage,
      ...otherParams
    });
  }
  if (err) {
    if (err.response && err.response.status == 403) {
      const onPress = () => dispatch(logout());
      if (token) {
        await activity.error('Your session is expired, please relogin.', {
          title: 'Session Expired',
          buttons: [{ text: 'Relogin', style: 'cancel', onPress }],
          cancelable: false
        });
      } else {
        await activity.error('Login to access this app.', {
          title: 'Login Required',
          buttons: [{ text: 'Login', style: 'cancel', onPress }],
          cancelable: false
        });
      }
    } else if (showError) {
      await activity.error(errorMessage);
    }
    throw errorMessage;
  }

  if (successMessage) {
    await activity.success(successMessage);
  }
  return res;
};

const api = {
  request
};

export default api;
