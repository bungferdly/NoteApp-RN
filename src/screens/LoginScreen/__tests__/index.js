import React from 'react';
import { Dimensions } from 'react-native';
import { renderer, activity, navigation } from '../../../utils/testUtils';
import LoginScreen from '../index';

const tree = renderer(<LoginScreen navigation={navigation} />);

test('login error', () => {
  tree.do('LOGIN_BTN').onPress();
  expect(activity.error).toBeCalled();
});

test('login success', () => {
  tree.do('USERNAME_INPUT').onChangeText('john');
  tree.do('PASSWORD_INPUT').onChangeText('1234');
  tree.do('LOGIN_BTN').onPress();
  expect(navigation.navigate).toBeCalledWith('App');
});

test('change theme', () => {
  const prevColor = tree.getProps('THEME_BTN').style.backgroundColor;
  tree.do('THEME_BTN').onPress();
  const nextColor = tree.getProps('THEME_BTN').style.backgroundColor;
  expect(nextColor).not.toEqual(prevColor);
});

test('change dimension', () => {
  tree.run(() => Dimensions.set({ window: { width: 814, height: 375 } }));
  expect(tree.getProps('LOGO').style.display).toEqual('none');
});
