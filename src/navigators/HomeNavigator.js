import { createStackNavigator } from 'react-navigation';
import NotesScreen from '../screens/NotesScreen';
import NoteDetailsScreen from '../screens/NoteDetailsScreen';

const HomeNavigator = createStackNavigator(
  {
    notes: NotesScreen,
    NoteDetails: NoteDetailsScreen
  },
  { headerMode: 'none' }
);

export default HomeNavigator;
