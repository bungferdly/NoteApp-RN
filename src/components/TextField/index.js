import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

function TextField({ style, ...props }) {
  styles.useLayout();
  return (
    <TextInput
      placeholderTextColor={styles.placeholderColor}
      keyboardAppearance={styles.keyboardAppearance}
      style={[styles.container, style]}
      {...props}
    />
  );
}

export default React.memo(TextField);
