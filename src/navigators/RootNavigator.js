import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LaunchScreen from '../screens/LaunchScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeNavigator from './HomeNavigator';

const RootNavigator = createAppContainer(
  createSwitchNavigator({
    Launch: LaunchScreen,
    Login: LoginScreen,
    Home: HomeNavigator
  })
);

export default RootNavigator;
