import React, { useContext, useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  RefreshControl,
  View,
  Platform,
  FlatList,
  SectionList,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { ScreenContext } from '../Screen';
import styles from './styles';

const ContentView = ({
  style,
  type,
  canLoadNext,
  isLoadNext,
  onLoadNext,
  refreshing,
  onRefresh,
  data,
  sections,
  renderItem,
  ...remProps
}) => {
  const { sendEvent, addEventListener } = useContext(ScreenContext);
  const [headerHeight, setHeaderHeight] = useState(0);
  styles.useLayout();
  useLayoutEffect(() => addEventListener('onHeaderHeight', setHeaderHeight), []);

  let Component = null;
  const newProps = { ...remProps };
  const rawStyle = StyleSheet.flatten(style);

  const contentStyle = {
    ...rawStyle,
    paddingTop:
      (headerHeight ? 0 : styles.content.paddingTop) +
      (rawStyle.paddingTop || rawStyle.paddingVertical || rawStyle.padding || 0),
    paddingBottom:
      styles.content.paddingBottom + (rawStyle.paddingBottom || rawStyle.paddingVertical || rawStyle.padding || 0),
    paddingLeft:
      styles.content.paddingHorizontal + (rawStyle.paddingLeft || rawStyle.paddingHorizontal || rawStyle.padding || 0),
    paddingRight:
      styles.content.paddingHorizontal + (rawStyle.paddingRight || rawStyle.paddingHorizontal || rawStyle.padding || 0)
  };

  if (type == 'view') {
    Component = View;
    newProps.style = [styles.container, contentStyle];
  } else {
    if (!renderItem) {
      Component = ScrollView;
    } else {
      if (!sections) {
        Component = FlatList;
        newProps.data = data;
      } else {
        Component = SectionList;
        newProps.sections = sections;
      }
      newProps.keyExtractor = (_, key) => key.toString();
      newProps.renderItem = renderItem;
      if (canLoadNext || isLoadNext) {
        newProps.onEndReached = () => canLoadNext && onLoadNext && onLoadNext();
        newProps.onEndReachedThreshold = 0.1;
        newProps.ListFooterComponent = <ActivityIndicator style={styles.ai} />;
      }
    }

    newProps.style = [styles.container, { marginTop: -headerHeight }];
    contentStyle.paddingTop += Platform.select({ android: headerHeight, ios: 0 });
    newProps.contentContainerStyle = contentStyle;

    newProps.onScroll = e => sendEvent('onScroll', e);
    newProps.onScrollBeginDrag = e => sendEvent('onScrollBeginDrag', e);
    newProps.onScrollEndDrag = e => sendEvent('onScrollEndDrag', e);
    newProps.onMomentumScrollEnd = e => sendEvent('onMomentumScrollEnd', e);
    newProps.scrollEventThrottle = 16;
    newProps.automaticallyAdjustContentInsets = false;
    newProps.contentInset = { top: headerHeight };
    newProps.contentOffset = { y: Platform.select({ android: 0, ios: -headerHeight }) };
    newProps.indicatorStyle = styles.indicator;
    if (onRefresh) {
      newProps.refreshControl = (
        <RefreshControl
          progressViewOffset={headerHeight}
          refreshing={refreshing}
          tintColor={styles.indicator}
          onRefresh={onRefresh}
        />
      );
    }
  }

  return <Component {...newProps} />;
};

export default ContentView;
