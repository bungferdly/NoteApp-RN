import { store } from '../../utils/storeUtils';

export default function LaunchScreen(props) {
  const token = store.getState().account.accessToken;
  props.navigation.navigate(token ? 'App' : 'Login');
  return null;
}
