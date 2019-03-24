import React from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { apiRequest } from '../../utils/apiUtils';
import { getNotesApiAction, getNextNotesApiAction } from '../../actions/noteActions';
import styles from './styles';
import ActivityView from '../../components/ActivityView';
import { logoutAction } from '../../actions/accountActions';

const mapStateToProps = state => ({
  noteState: state.note
});

export const navigationOptions = ({ navigation }) => ({
  title: 'Notes',
  headerRight: (
    <Text style={styles.barButtonText} testID="LOGOUT_BTN" onPress={navigation.getParam('logout')}>
      Logout
    </Text>
  )
});

class NotesScreen extends React.PureComponent {
  static navigationOptions = navigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({ logout: this._logout });
    apiRequest(getNotesApiAction());
  }

  _logout = () => {
    this.props.logoutAction();
  };

  _keyExtractor = item => item.id.toString();

  _reloadData = () => {
    apiRequest(getNotesApiAction({ isRefreshing: true }));
  };

  _requestNext = () => {
    const { currentPage, canLoadNext } = this.props.noteState;
    canLoadNext && apiRequest(getNextNotesApiAction({ page: currentPage + 1 }));
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { isLoading, errorMessage, isRefreshing, isLoadingNext, data } = this.props.noteState;
    if (!data) {
      return <ActivityView isLoading={isLoading} errorMessage={errorMessage} onReload={this._reloadData} />;
    }
    return (
      <FlatList
        testID="LIST"
        contentContainerStyle={styles.contentContainer}
        data={data}
        refreshing={isRefreshing}
        onRefresh={this._reloadData}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        onEndReached={this._requestNext}
        ListFooterComponent={isLoadingNext && <ActivityIndicator style={styles.footer} />}
        onEndReachedThreshold={0.1}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  { logoutAction }
)(NotesScreen);
