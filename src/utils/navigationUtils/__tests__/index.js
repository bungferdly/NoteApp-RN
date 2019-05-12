import navigation from '../';

test('navigate before navigator set', () => {
  navigation.navigate('SomeScreen');
  const { navigation: mockNav } = require('../../testUtils');
  expect(mockNav.navigate).toBeCalledWith('SomeScreen');
});

test('set get param', () => {
  const { navigation: mockNav } = require('../../testUtils');
  mockNav.setParams({ someParam: true });
  expect(mockNav.getParam('someParam')).toEqual(true);
});
