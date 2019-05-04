import { BackHandler } from 'react-native';

let navigator;
let backButtonEnabled = 0;

function setNavigator(navigatorRef) {
  navigator = navigatorRef;
  Object.keys(navigator._navigation).forEach(k => (navigation[k] = navigator._navigation[k]));
  BackHandler.addEventListener('hardwareBackPress', () => backButtonEnabled < 0);
}

function setBackButtonEnabled(enabled) {
  backButtonEnabled += enabled ? 1 : -1;
}

function reset(...props) {
  setTimeout(() => navigation.reset(...props), 100);
}

const navigation = {
  setNavigator,
  reset,
  setBackButtonEnabled
};

export default navigation;
