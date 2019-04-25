import React from 'react';
import { renderer, mockResponse, navigation } from '../../../utils/testUtils';
import NotesScreen from '..';

const tree = renderer(<NotesScreen navigation={navigation} />);

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

test('press item', () => {
  tree.do('ITEM_0').onPress();
  expect(navigation.navigate).toBeCalledWith('NoteDetails', { id: 23 });
});

test('logout', () => {
  tree.do('LOGOUT_BTN').onPress();
  expect(navigation.navigate).toBeCalledWith('Login');
});
