import React from 'react';
import { BackHandler } from 'react-native';
import { renderer, Alert } from '../../../utils/testUtils';
import ActivityOverlay from '../index';

let ref;
const tree = renderer(<ActivityOverlay ref={r => (ref = r)} />);

test('loading', () => {
  ref.loading('LOADING MESSAGE 1');
  ref.loading('LOADING MESSAGE 2', {});
  jest.runAllTimers();

  expect(tree.get('AI')).toBeTruthy();
  expect(tree.get('MESSAGE').children).toEqual('LOADING MESSAGE 1');
  ref.hide();
  jest.runAllTimers();

  expect(tree.get('MESSAGE').children).toEqual('LOADING MESSAGE 2');
  ref.hide();
  jest.runAllTimers();
});

test('success', () => {
  ref.success('SUCCESS MESSAGE 1');
  jest.runAllTimers();
  expect(tree.get('MESSAGE')).toBeFalsy();

  ref.success('SUCCESS MESSAGE 2', { duration: 0 });
  jest.runAllTimers();
  expect(tree.get('ICON')).toBeTruthy();
  expect(tree.get('MESSAGE').children).toEqual('SUCCESS MESSAGE 2');
  ref.hide();
  jest.runAllTimers();
});

test('error', () => {
  let pressed = false;
  ref.error('ERROR MESSAGE 1');
  ref.error('ERROR MESSAGE 2', { buttons: [{ onPress: () => (pressed = true) }] });
  jest.runAllTimers();
  expect(Alert.alert).toBeCalledTimes(2);
  expect(pressed).toBeTruthy();
});

test('alert', () => {
  ref.alert('NORMAL MESSAGE 1');
  ref.alert('NORMAL MESSAGE 2', {});
  jest.runAllTimers();
  expect(Alert.alert).toBeCalledTimes(2);
});

test('backHandler', () => {
  ref.loading('STOP BACK BUTTON');
  jest.runAllTimers();
  BackHandler.mockPressBack();
  expect(BackHandler.exitApp).not.toBeCalled();

  ref.hide();
  BackHandler.mockPressBack();
  expect(BackHandler.exitApp).toBeCalled();
});
