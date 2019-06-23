import { createSwitchNavigator } from 'react-navigation';
import LaunchScreen from '../screens/LaunchScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeNavigator from './HomeNavigator';

const LaunchNavigator = createSwitchNavigator({
  Launch: LaunchScreen,
  Login: LoginScreen,
  Home: HomeNavigator
});

export default LaunchNavigator;
