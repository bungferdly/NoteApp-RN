import React from 'react';
import { renderer, mockResponse, navigation } from '../../../utils/testUtils';
import NotesScreen, { navigationOptions } from '..';

const tree = renderer(<NotesScreen navigation={navigation} />);
const headerRightTree = renderer(navigationOptions({ navigation }).headerRight);

test('initial render', () => {
  expect(tree.getProps('ACTIVITY_VIEW').isLoading).toBeTruthy();
  expect(tree.getProps('LIST')).toBeFalsy();
});

test('initial error', () => {
  mockResponse({ status: 400 });
  tree.run();
  expect(tree.getProps('ACTIVITY_VIEW').errorMessage).toBeTruthy();
});

test('reload', () => {
  tree.do('ACTIVITY_VIEW').onReload();
  expect(tree.getProps('LIST').data.length).toEqual(10);
});

test('scroll to bottom', () => {
  tree.do('LIST').onEndReached();
  expect(tree.getProps('LIST').data.length).toEqual(20);
});

test('refreshing', () => {
  tree.do('LIST').onRefresh();
  expect(tree.getProps('LIST').data.length).toEqual(10);
});

test('logout', () => {
  headerRightTree.do('LOGOUT_BTN').onPress();
  expect(navigation.navigate).toBeCalledWith('Login');
});
