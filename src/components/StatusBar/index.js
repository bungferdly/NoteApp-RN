import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import styles from './styles';

function StatusBar(props) {
  styles.useLayout();
  return <RNStatusBar barStyle={styles.barStyle} backgroundColor={styles.backgroundColor} {...props} />;
}

export default StatusBar;
