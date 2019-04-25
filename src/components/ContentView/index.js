import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, RefreshControl, View, Platform, FlatList } from 'react-native';
import { ScreenContext } from '../Screen';
import styles from './styles';

function keyExtractor(_, key) {
  return key.toString();
}

const ContentViewWithScroll = Component => props => {
  const { style, refreshing, onRefresh, children, ...remProps } = props;
  const { sendEvent, addEventListener } = useContext(ScreenContext);
  const [inset, setInset] = useState(0);

  styles.useLayout();

  useEffect(() => addEventListener('onHeaderHeight', setInset), []);

  function onScroll(e) {
    sendEvent('onScroll', e);
  }

  function onScrollBeginDrag(e) {
    sendEvent('onScrollBeginDrag', e);
  }

  function onScrollEndDrag(e) {
    sendEvent('onScrollEndDrag', e);
  }

  function onMomentumScrollEnd(e) {
    sendEvent('onMomentumScrollEnd', e);
  }

  return (
    <Component
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.1}
      scrollEventThrottle={16}
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
export const ContentFlatList = ContentViewWithScroll(FlatList);

export default function ContentView({ style, ...props }) {
  styles.useLayout();
  return <View style={[styles.container, style]} {...props} />;
}
