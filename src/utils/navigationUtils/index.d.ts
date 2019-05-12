import initialState from '../../constants/initialState';
import { NavigationNavigateAction } from 'react-navigation';

interface INavigation {
  setNavigator(navigatorRef: any): void;
  setBackButtonEnabled(enabled: boolean): void;
  reset(actions: [NavigationNavigateAction], index?: Number): void;
  navigate(routeName: String, params?: String): void;
}

declare const navigation: INavigation;

export default navigation;
