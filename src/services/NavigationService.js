let navigator;

export function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(...props) {
  navigator._navigation.navigate(...props);
}

export const navigation = {
  navigate
};
