import { BackHandler } from 'react-native';

let navigator;
let backButtonEnabled = 0;

function setNavigator(navigatorRef) {
  navigator = navigatorRef;
  BackHandler.addEventListener('hardwareBackPress', () => backButtonEnabled < 0);
}

function navigate(...props) {
  navigator._navigation.navigate(...props);
}

function setBackButtonEnabled(enabled) {
  backButtonEnabled += enabled ? 1 : -1;
}

const navigation = {
  setNavigator,
  setBackButtonEnabled,
  navigate
};

export default navigation;
