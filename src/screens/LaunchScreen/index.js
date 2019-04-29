import { NavigationActions } from 'react-navigation';
import store from '../../utils/storeUtils';

export default function LaunchScreen(props) {
  const token = store.getState().account.accessToken;
  props.navigation.reset([NavigationActions.navigate({ routeName: token ? 'Home' : 'Login' })]);
  return null;
}
