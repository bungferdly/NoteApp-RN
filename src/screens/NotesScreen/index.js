import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getNotes, getNextNotes } from '../../actions/noteActions';
import styles from './styles';
import ActivityView from '../../components/ActivityView';
import { logout } from '../../actions/accountActions';

const mapStateToProps = state => ({
  noteState: state.note
});

function NotesScreen(props) {
  const { noteState, navigation } = props;
  const { isLoading, errorMessage, isRefreshing, isLoadingNext, data, currentPage, canLoadNext } = noteState;

  useEffect(() => {
    navigation.setParams({ logout: doLogout });
    props.getNotes();
  }, []);

  function doLogout() {
    props.logout();
    navigation.navigate('Login');
  }

  function keyExtractor(item) {
    return item.id.toString();
  }

  function reloadData() {
    props.getNotes({ isRefreshing: true });
  }

  function requestNext() {
    canLoadNext && props.getNextNotes({ page: currentPage + 1 });
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
    return <ActivityView isLoading={isLoading} errorMessage={errorMessage} onReload={reloadData} />;
  }
  return (
    <FlatList
      testID="LIST"
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
  headerRight: (
    <Text style={styles.barButtonText} testID="LOGOUT_BTN" onPress={navigation.getParam('logout')}>
      Logout
    </Text>
  )
});

export const navigationOptions = NotesScreen.navigationOptions;

export default connect(
  mapStateToProps,
  { logout, getNotes, getNextNotes }
)(NotesScreen);
