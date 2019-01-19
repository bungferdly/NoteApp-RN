import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';

export default class ActivityView extends React.PureComponent {
  render() {
    const { style, isLoading, errorMessage, onReload } = this.props;
    if (isLoading) {
      return (
        <View style={[styles.container, style]}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else if (errorMessage) {
      return (
        <View style={[styles.container, styles.errorContainer, style]}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          {onReload && (
            <Text style={styles.reloadText} onPress={onReload}>
              Reload
            </Text>
          )}
        </View>
      );
    }
    return null;
  }
}
