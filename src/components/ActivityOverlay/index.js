import React, { PureComponent } from 'react';
import { ActivityIndicator, View, Alert, Text } from 'react-native';
import styles from './styles';

let singleton = {
  show: () => {}
};

const types = {
  HIDDEN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3
};

export default class ActivityOverlay extends PureComponent {
  state = {};

  constructor(props) {
    super(props);
    singleton = this;
  }

  static showLoading(message, params = {}) {
    singleton.show({ type: types.LOADING, message, ...params });
  }

  static showSuccess(message, params = {}) {
    singleton.show({ type: types.SUCCESS, duration: 1000, message, ...params });
  }

  static showError(message, params = {}) {
    singleton.show({ type: types.ERROR, isAlert: true, title: 'Error', message, ...params });
  }

  static hide() {
    singleton.show({});
  }

  show = state => {
    this.setState({
      type: types.HIDDEN,
      title: undefined,
      message: undefined,
      buttons: undefined,
      isAlert: undefined,
      duration: undefined,
      ...state
    });
  };

  render() {
    const { type, title, message, buttons, isAlert, duration } = this.state;

    if (duration) {
      setTimeout(ActivityOverlay.hide, duration);
    }
    if (isAlert) {
      Alert.alert(title, message, buttons);
    } else if (type) {
      return (
        <View style={styles.container}>
          {type == types.LOADING && <ActivityIndicator size="large" />}
          {type == types.SUCCESS && <Text style={styles.iconText}>✓</Text>}
          {type == types.ERROR && <Text style={styles.iconText}>✕</Text>}
          {!!message && <Text style={styles.message}>{message}</Text>}
        </View>
      );
    }
    return null;
  }
}
