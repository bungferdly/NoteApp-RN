import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ActivityView from '../../components/ActivityView';
import { ContentFlatList } from '../../components/ContentView';
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
    navigation.navigate('Login');
  }

  function reloadData() {
    dispatch(getNotes({ isRefreshing: true }));
  }

  function requestNext() {
    canLoadNext && dispatch(getNextNotes({ page: currentPage + 1 }));
  }

  function renderItem({ item, index }) {
    return (
      <TouchableOpacity testID={`ITEM_${index}`} onPress={() => navigation.navigate('NoteDetails', { id: item.id })}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function footer() {
    return (isLoadingNext || canLoadNext) && <ActivityIndicator style={styles.footer} />;
  }

  return (
    <Screen>
      <HeaderBar title="Notes" bigTitle rights={[{ testID: 'LOGOUT_BTN', icon: 'log_out', onPress: doLogout }]} />
      {data ? (
        <ContentFlatList
          testID="LIST"
          contentContainerStyle={styles.contentContainer}
          data={data}
          refreshing={isRefreshing}
          onRefresh={reloadData}
          renderItem={renderItem}
          onEndReached={requestNext}
          ListFooterComponent={footer}
        />
      ) : (
        <ActivityView testID="ACTIVITY_VIEW" isLoading={isLoading} errorMessage={errorMessage} onReload={reloadData} />
      )}
    </Screen>
  );
}

export default NotesScreen;
