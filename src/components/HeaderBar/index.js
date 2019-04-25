import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Text, Animated, Platform } from 'react-native';
import { ScreenContext } from '../Screen';
import styles from './styles';
import Icon from '../Icon';

function _HeaderBar({ title, bigTitle, autoHide, isSearching, onSearch, rights, onBack }) {
  styles.useLayout();

  const topHeight = styles.topHeight;
  const barHeight = styles.barHeight;
  const bigHeight = title && bigTitle ? styles.bigHeight : 0;
  const searchHeight = onSearch ? styles.searchBarHeight : 0;
  const barAutoHide = autoHide === undefined ? styles.barHide : autoHide;
  const fontSizes = [styles.title.fontSize, bigHeight ? styles.titleBig.fontSize : styles.title.fontSize];

  const topHeightD = topHeight;
  const barHeightD = topHeightD + barHeight;
  const bigHeightD = barHeightD + bigHeight;
  const searchHeightD = bigHeightD + searchHeight;
  const totalHeightD = searchHeightD;

  const [sideWidth, setSideWidth] = useState(40);
  const [textLeft, setTextLeft] = useState(0);
  const inset = Platform.select({ android: totalHeightD, ios: 0 });
  const offset = new Animated.Value(totalHeightD);
  const { sendEvent, addEventListener } = useContext(ScreenContext);

  offset.diff = 0;

  useEffect(() => sendEvent('onHeaderHeight', totalHeightD));

  useEffect(() =>
    addEventListener('onScrollBeginDrag', e => {
      const y = -e.nativeEvent.contentOffset.y + inset;
      offset.drag = true;
      offset.diff = -offset._value + y;
    })
  );

  useEffect(() =>
    addEventListener('onScroll', e => {
      const y = -e.nativeEvent.contentOffset.y + inset;
      let targetOffset = -offset.diff + y;
      if (offset._value <= barHeightD && targetOffset > barHeightD && y < barHeightD) {
        offset.diff = -offset._value + y;
      } else {
        targetOffset = Math.min(totalHeightD, Math.max(topHeightD, targetOffset));
        offset.setValue(targetOffset);
      }
    })
  );

  useEffect(() =>
    addEventListener('onScrollEndDrag', e => {
      const y = -offset.diff + (-e.nativeEvent.contentOffset.y + inset);
      const h = [topHeightD, barHeightD, bigHeightD, searchHeightD].find(s => y - 10 < s);
      Animated.timing(offset, { duration: 100, toValue: h == undefined ? totalHeightD : h }).start();
      offset.drag = false;
    })
  );

  useEffect(() =>
    addEventListener('onMomentumScrollEnd', e => {
      const y = -offset.diff + (-e.nativeEvent.contentOffset.y + inset);
      const h = [topHeightD, barHeightD, bigHeightD, searchHeightD].find(s => y - 10 < s);
      Animated.timing(offset, { duration: 100, toValue: h == undefined ? totalHeightD : h }).start();
    })
  );

  const barTop = barAutoHide
    ? offset.interpolate({
        inputRange: [0, topHeightD, barHeightD, barHeightD + 1],
        outputRange: [-barHeight, -barHeight, 0, 0]
      })
    : 0;

  const titleTop = bigHeight
    ? offset.interpolate({
        inputRange: [topHeightD, barHeightD, bigHeightD, searchHeightD, searchHeightD + 1],
        outputRange: [0, 0, bigHeight - 6, bigHeight - 6, bigHeight - 5]
      })
    : 0;

  const titleLeft = bigHeight
    ? offset.interpolate({
        inputRange: [topHeightD, barHeightD, bigHeightD, totalHeightD + 1],
        outputRange: [0, 0, textLeft, textLeft]
      })
    : 0;

  const titleSize = bigHeight
    ? offset.interpolate({
        inputRange: [topHeightD, barHeightD, bigHeightD, bigHeightD + 1],
        outputRange: [fontSizes[0], fontSizes[0], fontSizes[1], fontSizes[1]]
      })
    : fontSizes[0];

  const space = bigHeight
    ? offset.interpolate({
        inputRange: [barHeightD - 1, barHeightD, bigHeightD, searchHeightD, searchHeightD + 1],
        outputRange: [0, 0, bigHeight, bigHeight, bigHeight + 1]
      })
    : 0;

  const searchSize = offset.interpolate({
    inputRange: [bigHeightD - 1, bigHeightD, searchHeightD, searchHeightD],
    outputRange: [0, 0, searchHeight, searchHeight]
  });

  function sideOnLayout(e) {
    setSideWidth(Math.max(Math.ceil(e.nativeEvent.layout.width), sideWidth));
  }

  function textOnLayout(e) {
    setTextLeft(Math.ceil(-e.nativeEvent.layout.x + 16));
  }

  return (
    <>
      <View style={{ height: totalHeightD }} />
      <View style={styles.background}>
        <View style={styles.barContainer}>
          <Animated.View style={[styles.bar, { marginTop: barTop }]}>
            <View style={[styles.left, { minWidth: sideWidth }]} onLayout={sideOnLayout}>
              {onBack && (
                <TouchableOpacity style={styles.button} onPress={() => onBack()}>
                  <Icon style={styles.icon} name="arrow_back" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.mid}>
              {!!title && (!bigHeight || !!textLeft) && (
                <Animated.Text
                  numberOfLines={1}
                  style={[styles.title, { left: titleLeft, top: titleTop, fontSize: titleSize }]}
                >
                  {title}
                </Animated.Text>
              )}
            </View>
            <View style={[styles.right, { minWidth: sideWidth }]} onLayout={sideOnLayout}>
              {rights &&
                rights.map(({ icon, text, ...props }, i) => (
                  <TouchableOpacity key={i} style={styles.button} {...props}>
                    {!!icon && <Icon style={styles.icon} name={icon} />}
                    {!!text && <Text style={styles.text}>{text}</Text>}
                  </TouchableOpacity>
                ))}
            </View>
          </Animated.View>
          {!!bigHeight && (
            <Text
              numberOfLines={1}
              style={[styles.title, styles.titleBig, { marginHorizontal: sideWidth }]}
              onLayout={textOnLayout}
            >
              {title}
            </Text>
          )}
          {!!bigHeight && <Animated.View style={{ marginTop: space }} />}
          {onSearch && (
            <Animated.View style={{ height: searchSize }}>
              <View style={styles.searchBar} />
            </Animated.View>
          )}
        </View>
      </View>
    </>
  );
}

const HeaderBar = React.memo(_HeaderBar);

export default HeaderBar;
