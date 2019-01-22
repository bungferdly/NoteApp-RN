import React from 'react';
import { renderer, navigation } from '../../../services/TestService';
import NotesScreen, { navigationOptions } from '..';

const tree = renderer(<NotesScreen navigation={navigation} />);
const headerRightTree = renderer(navigationOptions({ navigation }).headerRight);

test('initial render', () => {
  jest.runAllTimers();
  expect(tree.root.findByProps({ testID: 'LIST' }).props.data.length).toEqual(10);
});

test('scroll to bottom', () => {
  tree.root.findByProps({ testID: 'LIST' }).props.onEndReached();
  jest.runAllTimers();
  expect(tree.root.findByProps({ testID: 'LIST' }).props.data.length).toEqual(20);
});

test('refreshing', () => {
  tree.root.findByProps({ testID: 'LIST' }).props.onRefresh();
  jest.runAllTimers();
  expect(tree.root.findByProps({ testID: 'LIST' }).props.data.length).toEqual(10);
});

test('logout', () => {
  headerRightTree.root.findByProps({ testID: 'LOGOUT_BTN' }).props.onPress();
  expect(navigation.navigate).toBeCalledWith('Login');
});
