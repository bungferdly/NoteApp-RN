import React from 'react';
import { ActivityOverlay, renderer, navigation } from '../../../utils/testUtils';
import LoginScreen from '../index';

const tree = renderer(<LoginScreen navigation={navigation} />);

test('login error', () => {
  tree.getProps('LOGIN_BTN').onPress();
  jest.runAllTimers();
  expect(ActivityOverlay.showError).toBeCalled();
});

test('login success', () => {
  tree.getProps('USERNAME_INPUT').onChangeText('john');
  tree.getProps('PASSWORD_INPUT').onChangeText('1234');
  tree.getProps('LOGIN_BTN').onPress();
  jest.runAllTimers();
  expect(navigation.navigate).toBeCalledWith('App');
});
