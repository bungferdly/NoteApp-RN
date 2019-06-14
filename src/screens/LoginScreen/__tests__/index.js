import React from 'react';
import { Dimensions } from 'react-native';
import { renderer, activity, navigation } from '../../../utils/testUtils';
import LoginScreen from '../index';

const tree = renderer(<LoginScreen navigation={navigation} />);

test('login error', () => {
  tree.run('LOGIN_BTN');
  expect(activity.error).toBeCalled();
});

test('login success', () => {
  tree.run('USERNAME_INPUT', 'onChangeText', 'john');
  tree.run('PASSWORD_INPUT', 'onChangeText', '1234');
  tree.run('LOGIN_BTN');
  expect(navigation.navigate).toBeCalledWith('Home');
});

test('change theme', () => {
  const color1 = tree.get('THEME_BTN').style.backgroundColor;
  tree.run('THEME_BTN');
  const color2 = tree.get('THEME_BTN').style.backgroundColor;
  tree.run('THEME_BTN');
  const color3 = tree.get('THEME_BTN').style.backgroundColor;
  expect(color2).not.toEqual(color1);
  expect(color3).toEqual(color1);
});

test('change dimension', () => {
  tree.run(() => Dimensions.set({ window: { width: 814, height: 375 } }));
  expect(tree.get('LOGO').style.display).toEqual('none');
});
