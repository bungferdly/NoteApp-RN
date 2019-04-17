import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, RefreshControl, View, Platform } from 'react-native';
import { ScreenContext } from '../Screen';
import styles from './styles';

const ContentViewWithScroll = Component => props => {
  const { style, refreshing, onRefresh, children, ...remProps } = props;
  const { sendEvent, addEventListener } = useContext(ScreenContext);
  const [inset, setInset] = useState(0);

  styles.useLayout();

  useEffect(() => addEventListener('onHeaderHeight', setInset), []);

  function onScroll(e) {
    sendEvent('onScroll', e, props);
  }

  function onScrollBeginDrag(e) {
    sendEvent('onScrollBeginDrag', e, props);
  }

  function onScrollEndDrag(e) {
    sendEvent('onScrollEndDrag', e, props);
  }

  function onMomentumScrollEnd(e) {
    sendEvent('onMomentumScrollEnd', e, props);
  }

  return (
    <Component
      {...remProps}
      style={[styles.container, style, { marginTop: -inset }]}
      onScroll={onScroll}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: inset }}
      contentOffset={{ y: Platform.select({ android: 0, ios: -inset }) }}
      scrollIndicatorInsets={{ top: inset }}
      indicatorStyle={styles.indicator}
      onScrollBeginDrag={onScrollBeginDrag}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      scrollEventThrottle={16}
      refreshControl={
        onRefresh && (
          <RefreshControl
            progressViewOffset={inset}
            refreshing={refreshing}
            tintColor={styles.indicator}
            onRefresh={onRefresh}
          />
        )
      }
    >
      {Platform.select({ android: <View style={{ height: inset }} />, ios: null })}
      {children}
    </Component>
  );
};

export const ContentScrollView = ContentViewWithScroll(ScrollView);
