import React from 'react';
import { renderer, navigation } from '../../../utils/testUtils';
import NotesScreen, { navigationOptions } from '..';

const tree = renderer(<NotesScreen navigation={navigation} />);
const headerRightTree = renderer(navigationOptions({ navigation }).headerRight);

test('initial render', () => {
  jest.runAllTimers();
  expect(tree.getProps('LIST').data.length).toEqual(10);
});

test('scroll to bottom', () => {
  tree.getProps('LIST').onEndReached();
  jest.runAllTimers();
  expect(tree.getProps('LIST').data.length).toEqual(20);
});

test('refreshing', () => {
  tree.getProps('LIST').onRefresh();
  jest.runAllTimers();
  expect(tree.getProps('LIST').data.length).toEqual(10);
});

test('logout', () => {
  headerRightTree.getProps('LOGOUT_BTN').onPress();
  expect(navigation.navigate).toBeCalledWith('Login');
});
