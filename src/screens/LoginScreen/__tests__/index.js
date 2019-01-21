import React from 'react';
import { ActivityOverlay, renderer, navigation } from '../../../services/TestService';
import LoginScreen from '../index';

const tree = renderer(<LoginScreen navigation={navigation} />);

test('login error', () => {
  tree.root.findByProps({ testID: 'LOGIN_BTN' }).props.onPress();
  jest.runAllTimers();
  expect(ActivityOverlay.showError).toBeCalled();
});

test('login success', () => {
  tree.root.findByProps({ testID: 'USERNAME_INPUT' }).props.onChangeText('john');
  tree.root.findByProps({ testID: 'PASSWORD_INPUT' }).props.onChangeText('1234');
  tree.root.findByProps({ testID: 'LOGIN_BTN' }).props.onPress();
  jest.runAllTimers();
  expect(navigation.navigate).toBeCalledWith('App');
});
