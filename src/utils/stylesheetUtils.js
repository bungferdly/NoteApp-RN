import { useState, useEffect, useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';
import config from '../constants/config';
import store from './storeUtils';

let _dimRgx;
let _window = {};
let _safeArea = {};
let _theme;

function calculateStyles(styles, styleGenerator, window, theme) {
  if (_window.width != window.width || _window.height != window.height || _theme != theme) {
    const screen = Dimensions.get('screen');
    const [height] = [screen.width, screen.height].sort((a, b) => b - a);
    const isLandscape = Number(screen.width > screen.height);
    let screenLevel = 0;
    Platform.select({ ios: height > 0, android: false }) && screenLevel++;
    Platform.select({ ios: height > 800, android: false }) && screenLevel++;
    Platform.select({ ios: height > 1000, android: false }) && screenLevel++;
    Platform.select({ ios: height > 1100, android: false }) && screenLevel++;

    _window = window;

    _theme = theme;

    _safeArea = {};
    _safeArea.SF_LEFT = [[0, 0, 0, 0, 0], [0, 0, 44, 0, 0]][isLandscape][screenLevel];
    _safeArea.SF_RIGHT = _safeArea.SF_LEFT;
    _safeArea.SF_TOP = [[0, 20, 44, 20, 24], [0, 0, 0, 20, 24]][isLandscape][screenLevel];
    _safeArea.SF_BOTTOM = [[0, 0, 34, 0, 20], [0, 0, 24, 0, 20]][isLandscape][screenLevel];

    const w = ['l', 'm', 's'][[750, 350, 0].findIndex(n => _window.width > n)];
    const h = ['l', 'm', 's'][[900, 600, 0].findIndex(n => _window.height > n)];
    _dimRgx = new RegExp(`^w(a|${w})h(a|${h})$`);
  }

  const newStyles = generateStyles(styleGenerator);
  Object.keys(newStyles).forEach(k => (styles[k] = newStyles[k]));
}

function generateStyles(styleGenerator) {
  const ss = {};
  Object.keys(styleGenerator).forEach(k => {
    let s = styleGenerator[k];
    while (s) {
      if (typeof s == 'string' && s[0] == '@') {
        const key = s.replace('@', '');
        s = _safeArea[key] || config.themes[_theme][key] || config.themes.default[key];
      } else if (typeof s == 'object' && s.waha) {
        const { waha, ...dims } = s;
        s = dims[Object.keys(dims).find(k => _dimRgx.test(k))] || waha;
      } else {
        break;
      }
    }
    if (typeof s == 'object') {
      s = generateStyles(s);
    }
    ss[k] = s;
  });
  return ss;
}

function create(styleGenerator) {
  const styles = {};

  styles.useLayout = function() {
    const [window, setWindow] = useState(() => Dimensions.get('window'));
    const [theme] = store.useState(s => s.theme.value);

    useEffect(() => {
      const listener = ({ window }) => setWindow(window);
      Dimensions.addEventListener('change', listener);
      return () => Dimensions.removeEventListener('change', listener);
    }, [window]);

    useMemo(() => {
      calculateStyles(styles, styleGenerator, window, theme);
    }, [window, theme]);
  };

  return styles;
}

const StyleSheet = {
  create
};

export default StyleSheet;
