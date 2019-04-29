import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ActivityView from '../../components/ActivityView';
import ContentView from '../../components/ContentView';
import store from '../../utils/storeUtils';
import { getNotes, getNextNotes } from '../../actions/noteActions';
import { logout } from '../../actions/accountActions';
import styles from './styles';
import HeaderBar from '../../components/HeaderBar';
import Screen from '../../components/Screen';

function NotesScreen(props) {
  const [noteState, dispatch] = store.useState(s => s.note);
  const { isLoading, errorMessage, isRefreshing, isLoadingNext, data, currentPage, canLoadNext } = noteState;
  const { navigation } = props;
  styles.useLayout();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  function doLogout() {
    dispatch(logout());
    navigation.reset([NavigationActions.navigate({ routeName: 'Login' })]);
  }

  function reloadData() {
    dispatch(getNotes({ isRefreshing: true }));
  }

  function requestNext() {
    dispatch(getNextNotes({ page: currentPage + 1 }));
  }

  function renderItem({ item, index }) {
    return (
      <TouchableOpacity testID={`ITEM_${index}`} onPress={() => navigation.navigate('NoteDetails', { id: item.id })}>
        <View style={[styles.itemContainer, styles[`itemContainer_${index}`]]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Screen>
      <HeaderBar bigTitle="Notes" rights={[{ testID: 'LOGOUT_BTN', icon: 'log_out', onPress: doLogout }]} />
      {data ? (
        <ContentView
          testID="LIST"
          style={styles.container}
          data={data}
          refreshing={isRefreshing}
          onRefresh={reloadData}
          renderItem={renderItem}
          canLoadNext={canLoadNext}
          isLoadNext={isLoadingNext}
          onLoadNext={requestNext}
        />
      ) : (
        <ActivityView testID="ACTIVITY_VIEW" isLoading={isLoading} errorMessage={errorMessage} onReload={reloadData} />
      )}
    </Screen>
  );
}

export default NotesScreen;
