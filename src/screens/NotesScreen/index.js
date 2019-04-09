import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ActivityView from '../../components/ActivityView';
import store from '../../utils/storeUtils';
import { getNotes, getNextNotes } from '../../actions/noteActions';
import { logout } from '../../actions/accountActions';
import styles from './styles';

function NotesScreen(props) {
  const [noteState, dispatch] = store.useState(s => s.note);
  const { isLoading, errorMessage, isRefreshing, isLoadingNext, data, currentPage, canLoadNext } = noteState;
  const { navigation } = props;
  styles.useLayout();

  useEffect(() => {
    navigation.setParams({ logout: doLogout });
    dispatch(getNotes());
  }, []);

  function doLogout() {
    dispatch(logout());
    navigation.navigate('Login');
  }

  function keyExtractor(item) {
    return item.id.toString();
  }

  function reloadData() {
    dispatch(getNotes({ isRefreshing: true }));
  }

  function requestNext() {
    canLoadNext && dispatch(getNextNotes({ page: currentPage + 1 }));
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function footer() {
    return (isLoadingNext || canLoadNext) && <ActivityIndicator style={styles.footer} />;
  }

  if (!data) {
    return (
      <ActivityView testID="ACTIVITY_VIEW" isLoading={isLoading} errorMessage={errorMessage} onReload={reloadData} />
    );
  }
  return (
    <FlatList
      testID="LIST"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      refreshing={isRefreshing}
      onRefresh={reloadData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={requestNext}
      ListFooterComponent={footer}
      onEndReachedThreshold={0.1}
    />
  );
}

NotesScreen.navigationOptions = ({ navigation }) => ({
  title: 'Notes',
  headerTitleStyle: styles.headerTitle,
  headerStyle: styles.header,
  headerRight: (
    <Text style={styles.barButtonText} testID="LOGOUT_BTN" onPress={navigation.getParam('logout')}>
      Logout
    </Text>
  )
});

export const navigationOptions = NotesScreen.navigationOptions;

export default NotesScreen;
