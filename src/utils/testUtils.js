import React from 'react';
import { Provider } from 'react-redux';
import TestRenderer, { act } from 'react-test-renderer';
import realNavigation from './navigationUtils';
import realActivity from './activityUtils';
import mockClient from '../apis/__mocks__';

//mock hooks
React.useEffect = React.useLayoutEffect;

//mock async storage
jest.setMock('@react-native-community/async-storage', {
  getItem: () => Promise.reject(),
  setItem: () => Promise.reject()
});

//mock activity overlay
const alertFn = (_, { buttons } = {}) => {
  buttons && buttons.forEach(b => b.onPress && b.onPress());
  return Promise.resolve();
};
export const activity = {
  loading: jest.fn(Promise.resolve),
  success: jest.fn(Promise.resolve),
  error: jest.fn(alertFn),
  alert: jest.fn(alertFn),
  hide: jest.fn(Promise.resolve)
};
realActivity.setComponent(activity);

//mock navigation
let _params = {};
export const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setParams: params => (_params = params),
  getParam: key => _params[key]
};
realNavigation.setNavigator({
  _navigation: navigation
});

// mock alert
export const Alert = {
  alert: jest.fn((_, __, buttons) => {
    buttons && buttons.forEach(b => b.onPress && b.onPress());
  })
};
jest.setMock('Alert', Alert);

//mock environment
const NativeModules = require.requireActual('react-native').NativeModules;
NativeModules.AppConfig = {
  env: 'dev'
};

//mock timer
jest.useFakeTimers();

//mock api response
export const mockResponse = mockClient.mockResponse;

export const renderer = component => {
  const store = require('./storeUtils').default;
  const render = comp => <Provider store={store}>{comp}</Provider>;
  const tree = TestRenderer.create(render(component));
  const getProps = testID => {
    try {
      return tree.root.findByProps({ testID }).props;
    } catch {
      return undefined;
    }
  };
  const doo = testID => {
    const newProps = {};
    const props = getProps(testID);
    Object.keys(props).forEach(k => {
      if (typeof props[k] == 'function') {
        newProps[k] = (...args) => {
          run(() => props[k](...args));
        };
      }
    });
    return newProps;
  };
  const run = fn => {
    act(() => {
      fn && fn();
      jest.runAllTimers();
    });
  };
  return { getProps, do: doo, run };
};

afterEach(() => {
  mockClient.mockResponse(undefined);
});
