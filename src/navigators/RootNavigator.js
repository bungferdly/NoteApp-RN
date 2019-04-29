import { createStackNavigator, createAppContainer } from 'react-navigation';
import NotesScreen from '../screens/NotesScreen';
import LoginScreen from '../screens/LoginScreen';
import LaunchScreen from '../screens/LaunchScreen';
import NoteDetailsScreen from '../screens/NoteDetailsScreen';

const rootNavigator = createStackNavigator(
  {
    Launch: LaunchScreen,
    Login: LoginScreen,
    Home: NotesScreen,
    NoteDetails: NoteDetailsScreen
  },
  { headerMode: 'none' }
);

export default createAppContainer(rootNavigator);
