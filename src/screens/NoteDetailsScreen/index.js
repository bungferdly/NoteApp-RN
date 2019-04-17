import React from 'react';
import { View, Text } from 'react-native';
import store from '../../utils/storeUtils';
import HeaderBar from '../../components/HeaderBar';
import styles from './styles';
import Screen from '../../components/Screen';
import { ContentScrollView } from '../../components/ContentView';

function NoteDetailsScreen(props) {
  const { navigation } = props;
  const { id } = navigation.state.params;
  const [note] = store.useState(s => s.note.data.find(d => d.id == id));

  styles.useLayout();

  return (
    <Screen>
      <HeaderBar
        navigation={navigation}
        onSearch={() => {}}
        useBigTitle
        title="Note Details"
        rights={[{ icon: 'log_out' }, { icon: 'log_out' }]}
      />
      <ContentScrollView>
        <Text style={{ height: 2000, color: 'white' }}>{note.title}</Text>
      </ContentScrollView>
    </Screen>
  );
}

export default NoteDetailsScreen;
