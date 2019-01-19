import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import NotesScreen from '../screens/NotesScreen';
import LoginScreen from '../screens/LoginScreen';
import LaunchScreen from '../screens/LaunchScreen';

const switchNavigator = createSwitchNavigator({
  Launch: { screen: LaunchScreen },
  Login: { screen: LoginScreen },
  App: {
    screen: createStackNavigator({
      Notes: { screen: NotesScreen }
    })
  }
});

export default createAppContainer(switchNavigator);
