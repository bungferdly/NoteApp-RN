import React from 'react';
import { renderer, mockResponse, navigation } from '../../../utils/testUtils';
import NotesScreen from '..';

const tree = renderer(<NotesScreen navigation={navigation} />);

test('initial render', () => {
  expect(tree.get('ACTIVITY_VIEW').isLoading).toBeTruthy();
  expect(tree.get('LIST')).toBeFalsy();
});

test('initial error', () => {
  mockResponse({ status: 400 });
  tree.run();
  expect(tree.get('ACTIVITY_VIEW').errorMessage).toBeTruthy();
});

test('reload', () => {
  tree.run('ACTIVITY_VIEW', 'onReload');
  expect(tree.get('LIST').data.length).toEqual(10);
});

test('scroll to bottom', () => {
  tree.run('LIST', 'onLoadNext');
  expect(tree.get('LIST').data.length).toEqual(20);
});

test('refreshing', () => {
  tree.run('LIST', 'onRefresh');
  expect(tree.get('LIST').data.length).toEqual(10);
});

test('press item', () => {
  tree.run('ITEM_0');
  expect(navigation.navigate).toBeCalledWith('NoteDetails', { id: 23 });
});

test('logout', () => {
  tree.run('LOGOUT_BTN');
  expect(navigation.navigate).toBeCalledWith('Login');
});
