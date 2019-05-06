import { BackHandler } from 'react-native';

let backButtonEnabled;
let tempActions = [];

function setNavigator(navigator) {
  const nav = navigator._navigation;
  Object.keys(nav).forEach(k => (navigation[k] = nav[k]));
  tempActions.forEach(([k, ...props]) => nav[k](...props));
  tempActions = [];
}

function setBackButtonEnabled(enabled) {
  if (backButtonEnabled === undefined) {
    backButtonEnabled = 0;
    BackHandler.addEventListener('hardwareBackPress', () => backButtonEnabled < 0);
  }
  backButtonEnabled += enabled ? 1 : -1;
}

const navigation = {
  setNavigator,
  setBackButtonEnabled
};

['reset', 'navigate'].forEach(k => {
  navigation[k] = (...props) => tempActions.push([k, ...props]);
});

export default navigation;
