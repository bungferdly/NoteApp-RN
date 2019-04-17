import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import NotesScreen from '../screens/NotesScreen';
import LoginScreen from '../screens/LoginScreen';
import LaunchScreen from '../screens/LaunchScreen';
import NoteDetailsScreen from '../screens/NoteDetailsScreen';

const switchNavigator = createSwitchNavigator({
  Launch: { screen: LaunchScreen },
  Login: { screen: LoginScreen },
  App: {
    screen: createStackNavigator(
      {
        Notes: { screen: NotesScreen },
        NoteDetails: { screen: NoteDetailsScreen }
      },
      { headerMode: 'none' }
    )
  }
});

export default createAppContainer(switchNavigator);
