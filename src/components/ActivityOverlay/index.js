import React from 'react';
import { ActivityIndicator, View, Alert, Text } from 'react-native';
import styles from './styles';
import navigation from '../../utils/navigationUtils';

const types = {
  HIDDEN: 0,
  OVERLAY: 1,
  ALERT: 2
};

let promise = Promise.resolve();

export default class ActivityOverlay extends React.Component {
  state = {
    callback: null,
    viewState: {}
  };

  loading = (message, params = {}) => this.show({ type: types.OVERLAY, aiSize: 'large', message, ...params });

  success = (message, params = {}) => this.show({ type: types.OVERLAY, icon: '✓', duration: 1000, message, ...params });

  error = (message, params = {}) => this.show({ type: types.ALERT, title: 'Error', message, ...params });

  alert = (message, params = {}) => this.show({ type: types.ALERT, message, ...params });

  show = viewState => {
    const newPromise = () => new Promise(callback => this.setState({ viewState, callback }));
    promise = promise.then(newPromise);
    return promise;
  };

  hide = () => {
    const { callback } = this.state;
    this.setState({ viewState: {}, callback: null }, callback);
    return promise;
  };

  componentDidUpdate(_, prevState) {
    if ((this.state.viewState.type == types.OVERLAY) !== (prevState.viewState.type == types.OVERLAY)) {
      navigation.setBackButtonEnabled(this.state.viewState.type != types.OVERLAY);
    }
  }

  render() {
    const { callback, viewState } = this.state;
    const { type, title, message, buttons, aiSize, icon, duration, cancelable } = viewState;
    switch (type) {
      case types.ALERT: {
        const newButtons = (buttons || [{ text: 'OK', style: 'cancel' }]).map(b => ({
          ...b,
          onPress: () => {
            callback();
            b.onPress && b.onPress();
          }
        }));
        Alert.alert(title, message, newButtons, { cancelable, onDismiss: callback });
        return null;
      }
      case types.OVERLAY:
        if (duration) {
          setTimeout(this.hide, duration);
        }
        return (
          <View style={styles.container}>
            {!!aiSize && <ActivityIndicator testID="AI" size={aiSize} />}
            {!!icon && (
              <Text testID="ICON" style={styles.iconText}>
                {icon}
              </Text>
            )}
            {!!message && (
              <Text testID="MESSAGE" style={styles.message}>
                {message}
              </Text>
            )}
          </View>
        );
      default:
        return null;
    }
  }
}
