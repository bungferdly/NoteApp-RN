import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';

function ActivityView({ style, isLoading, errorMessage, onReload, ...props }) {
  if (isLoading) {
    return (
      <View style={[styles.container, style]} {...props}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={[styles.container, styles.errorContainer, style]} {...props}>
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

export default React.memo(ActivityView);
