import { BackHandler } from 'react-native';

let backButtonEnabled;
let nav;

function setNavigator(navigator) {
  nav = nav || navigator._navigation;
}

function setBackButtonEnabled(enabled) {
  if (backButtonEnabled === undefined) {
    backButtonEnabled = 0;
    BackHandler.addEventListener('hardwareBackPress', () => backButtonEnabled < 0);
  }
  backButtonEnabled += enabled ? 1 : -1;
}

function navigate(...params) {
  nav.navigate(...params);
}

const navigation = {
  setNavigator,
  setBackButtonEnabled,
  navigate
};

export default navigation;
