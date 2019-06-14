import initialState from '../../constants/initialState';

interface INavigation {
  setNavigator(navigatorRef: any): void;
  setBackButtonEnabled(enabled: boolean): void;
  navigate(routeName: String, params?: String): void;
}

declare const navigation: INavigation;

export default navigation;
