import navigation from '../';

test('navigate', () => {
  const { navigation: mockNav } = require('../../testUtils');
  navigation.navigate('SomeScreen');
  expect(mockNav.navigate).toBeCalledWith('SomeScreen');
});

test('set get param', () => {
  const { navigation: mockNav } = require('../../testUtils');
  mockNav.setParams({ someParam: true });
  expect(mockNav.getParam('someParam')).toEqual(true);
});
