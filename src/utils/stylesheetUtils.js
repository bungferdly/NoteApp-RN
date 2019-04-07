import { useState, useEffect, useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';
import theme from './themeUtils';
import globalStyles from '../constants/globalStyles';

export const L = Dimensions.get('window');
export const G = globalStyles;

function calculateSafeArea() {
  const screen = Dimensions.get('screen');
  const [height] = [screen.width, screen.height].sort((a, b) => b - a);
  const isLandscape = Number(screen.width > screen.height);
  let screenLevel = 0;
  Platform.select({ ios: height > 800, android: false }) && screenLevel++;
  Platform.select({ ios: height > 1000, android: false }) && screenLevel++;
  Platform.select({ ios: height > 1100, android: false }) && screenLevel++;
  L.left = [[0, 0, 0, 0], [0, 44, 0, 0]][isLandscape][screenLevel];
  L.right = L.left;
  L.top = [[20, 44, 20, 24], [0, 0, 20, 24]][isLandscape][screenLevel];
  L.bottom = [[0, 34, 0, 20], [0, 24, 0, 20]][isLandscape][screenLevel];
}

function generateStyles(styleGenerator) {
  const ss = {};
  Object.keys(styleGenerator).forEach(k => {
    const s = styleGenerator[k];
    if (Array.isArray(s)) {
      ss[k] = theme.select(s);
    } else if (typeof s == 'object') {
      ss[k] = generateStyles(s);
    } else if (typeof s == 'function') {
      ss[k] = s();
    } else {
      ss[k] = s;
    }
  });
  return ss;
}

function create(styleGenerator) {
  const styles = {};
  styles.useLayout = function() {
    const [window, setWindow] = useState(() => Dimensions.get('window'));
    theme.useValue();

    useEffect(() => {
      const listener = ({ window }) => setWindow(window);
      Dimensions.addEventListener('change', listener);
      return () => Dimensions.removeEventListener('change', listener);
    }, [window]);

    useMemo(() => {
      Object.keys(window).forEach(k => (L[k] = window[k]));
      calculateSafeArea();
      const newStyles = generateStyles(styleGenerator);
      Object.keys(newStyles).forEach(k => (styles[k] = newStyles[k]));
    }, [window, theme.value]);
  };

  return styles;
}

const StyleSheet = {
  create
};

export default StyleSheet;
