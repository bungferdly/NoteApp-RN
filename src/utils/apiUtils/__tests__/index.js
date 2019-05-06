import { mockResponse, activity } from '../../testUtils';
import { login, logout } from '../../../actions/accountActions';
import { getNotes } from '../../../actions/noteActions';
import api from '../';

test('token required error', () => {
  mockResponse({ status: 403 });
  login({});
  jest.runAllTimers();
  expect(activity.error).toBeCalled();
});

test('login success', () => {
  login({ username: 'john', password: '1234' });
  jest.runAllTimers();
  expect(activity.success).toBeCalled();
  expect(activity.error).not.toBeCalled();
});

test('token expired error', () => {
  mockResponse({ status: 403 });
  getNotes();
  jest.runAllTimers();
  expect(activity.error).toBeCalled();
});

test('simple api error', () => {
  mockResponse({ status: 400 });
  api.request({ api: { url: 'ANY_URL' } });
  jest.runAllTimers();
});

test('logout in the middle of request', () => {
  login({ username: 'john', password: '1234' });
  jest.runAllTimers();

  let error;
  api.request({ api: { url: 'ANY_URL' } }).catch(err => (error = err));
  logout();
  jest.runAllTimers();
  expect(error).toEqual('User logged out.');
});
