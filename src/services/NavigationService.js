import { NavigationActions } from 'react-navigation';

let navigator;

export function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(NavigationActions.navigate({ routeName, params }));
}

export const navigation = {
  navigate
};
