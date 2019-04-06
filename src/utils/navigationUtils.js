let navigator;

function setNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(...props) {
  navigator._navigation.navigate(...props);
}

const navigation = {
  setNavigator,
  navigate
};

export default navigation;
