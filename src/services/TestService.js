import React from 'react';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';
import { setTopLevelNavigator } from './NavigationService';

//mock activity overlay
export const ActivityOverlay = {
  showLoading: jest.fn(),
  showError: jest.fn(),
  showSuccess: jest.fn()
};
jest.setMock('../components/ActivityOverlay', ActivityOverlay);

//mock navigation
let _params;
export const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setParams: params => (_params = params),
  getParam: key => _params[key]
};
const navigator = {
  _navigation: navigation
};
setTopLevelNavigator(navigator);

//mock alert
export const Alert = {
  alert: jest.fn()
};
jest.setMock('Alert', Alert);

//mock environment
const NativeModules = require.requireActual('react-native').NativeModules;
NativeModules.AppConfig = {
  env: 'dev'
};

//mock timer
jest.useFakeTimers();

//clear mock
afterEach(() => {
  navigation.navigate.mockClear();
  navigation.goBack.mockClear();
  ActivityOverlay.showLoading.mockClear();
  ActivityOverlay.showError.mockClear();
  ActivityOverlay.showSuccess.mockClear();
  Alert.alert.mockClear();
});

export const { store } = require('./ReduxService');
export const renderer = component => TestRenderer.create(<Provider store={store}>{component}</Provider>);
