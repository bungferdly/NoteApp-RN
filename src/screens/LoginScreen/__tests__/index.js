import React from 'react';
import { act } from 'react-test-renderer';
import { renderer, activity, navigation } from '../../../utils/testUtils';
import LoginScreen from '../index';

const tree = renderer(<LoginScreen navigation={navigation} />);

test('login error', () => {
  tree.getProps('LOGIN_BTN').onPress();
  jest.runAllTimers();
  expect(activity.error).toBeCalled();
});

test('login success', () => {
  act(() => {
    tree.getProps('PASSWORD_INPUT').onChangeText('1234');
    tree.getProps('USERNAME_INPUT').onChangeText('john');
  });
  tree.getProps('LOGIN_BTN').onPress();
  jest.runAllTimers();
  expect(navigation.navigate).toBeCalledWith('App');
});
