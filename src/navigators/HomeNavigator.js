import { createStackNavigator } from 'react-navigation';
import NotesScreen from '../screens/NotesScreen';
import NoteDetailsScreen from '../screens/NoteDetailsScreen';

const HomeNavigator = createStackNavigator(
  {
    Notes: NotesScreen,
    NoteDetails: NoteDetailsScreen
  },
  { headerMode: 'none' }
);

export default HomeNavigator;
