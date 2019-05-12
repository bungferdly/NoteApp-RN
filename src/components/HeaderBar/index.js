import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { ScreenContext } from '../Screen';
import styles from './styles';
import Icon from '../Icon';

function _HeaderBar({ title, bigTitle, autoHide, onSearch, rights, onBack }) {
  styles.useLayout();

  const topHeight = styles.topHeight;
  const barHeight = styles.barHeight;
  const bigHeight = bigTitle ? styles.bigHeight : 0;
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
  const { sendEvent, addEventListener } = useContext(ScreenContext);

  const offset = new Animated.Value(totalHeightD);
  const prev = { offset: 0, scrollOffset: 0 };

  useEffect(() => sendEvent('onHeaderHeight', totalHeightD));

  useEffect(() =>
    addEventListener('onScroll', e => {
      const y = -e.nativeEvent.contentOffset.y;
      if (y >= barHeightD) {
        prev.offset = Math.min(y, totalHeightD);
      } else {
        prev.offset = Math.min(Math.max(prev.offset + y - prev.scrollOffset, topHeightD), barHeightD);
      }
      prev.scrollOffset = y;
      offset.setValue(prev.offset);
    })
  );

  const bgColor = offset.interpolate({
    inputRange: [barHeightD - 1, barHeightD, barHeightD + 1, barHeightD + 2],
    outputRange: [
      styles.background.backgroundColor,
      styles.background.backgroundColor,
      styles.bigBackground.backgroundColor,
      styles.bigBackground.backgroundColor
    ]
  });

  const bgBorder = offset.interpolate({
    inputRange: [barHeightD - 1, barHeightD, barHeightD + 1, barHeightD + 2],
    outputRange: [
      styles.background.borderBottomWidth,
      styles.background.borderBottomWidth,
      styles.bigBackground.borderBottomWidth,
      styles.bigBackground.borderBottomWidth
    ]
  });

  const bgElevation = barAutoHide
    ? 0
    : offset.interpolate({
        inputRange: [barHeightD - 2, barHeightD - 1, barHeightD, barHeightD + 1],
        outputRange: [
          styles.background.elevation,
          styles.background.elevation,
          styles.bigBackground.elevation,
          styles.bigBackground.elevation
        ]
      });

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
      <Animated.View
        style={[styles.background, { backgroundColor: bgColor, borderBottomWidth: bgBorder, elevation: bgElevation }]}
      >
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
              {!!(bigTitle || title) && (!bigHeight || !!textLeft) && (
                <Animated.Text
                  numberOfLines={1}
                  style={[styles.title, { left: titleLeft, top: titleTop, fontSize: titleSize }]}
                >
                  {bigTitle || title}
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
              {bigTitle || title}
            </Text>
          )}
          {!!bigHeight && <Animated.View style={{ marginTop: space }} />}
          {onSearch && (
            <Animated.View style={{ height: searchSize }}>
              <View style={styles.searchBar} />
            </Animated.View>
          )}
        </View>
      </Animated.View>
    </>
  );
}

const HeaderBar = React.memo(_HeaderBar);

export default HeaderBar;
