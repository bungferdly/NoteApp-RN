import { store } from '../../services/ReduxService';

export default function LaunchScreen(props) {
  const token = store.getState().account.accessToken;
  props.navigation.navigate(token ? 'App' : 'Login');
  return null;
}
