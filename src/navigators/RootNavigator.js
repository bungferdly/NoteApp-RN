import { createStackNavigator, createAppContainer } from 'react-navigation';
import LaunchScreen from '../screens/LaunchScreen';
import LoginScreen from '../screens/LoginScreen';
import NotesScreen from '../screens/NotesScreen';
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
