import { useState, useEffect, useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';
import themes from '../../constants/themes';

let devices = Platform.select({
  ios: [
    { width: 320, height: 480, pTop: 20 }, //iPhone4,4s
    { width: 320, height: 568, pTop: 20 }, //iPhone5,SE
    { width: 375, height: 667, pTop: 20 }, //iPhone6,7,8
    { width: 414, height: 736, pTop: 20 }, //iPhone6Plus,7Plus,8Plus
    { width: 375, height: 812, pTop: 44, pBottom: 34, lLeft: 44, lRight: 44 }, //iPhoneX,Xs
    { width: 414, height: 896, pTop: 44, pBottom: 34, lLeft: 44, lRight: 44 }, //iPhoneXMax,XsMax,XR
    { width: 768, height: 1024, pTop: 24, lTop: 24 }, //iPad,Mini,Air, Pro9
    { width: 834, height: 1112, pTop: 20, lTop: 20 }, //iPadPro10
    { width: 1024, height: 1366, pTop: 24, lTop: 24 } //iPadPro12
  ],
  android: []
});

let _dimRgx;
let _window = {};
let _safeArea = {};
let _theme;

function calculateStyles(styles, styleGenerator, window, theme) {
  if (_window.width != window.width || _window.height != window.height || _theme != theme) {
    const screen = Dimensions.get('screen');
    const [width, height] = [screen.width, screen.height].sort();
    const prefix = Number(screen.width < screen.height) ? 'p' : 'l';
    const device = devices.find(d => d.width == width && d.height == height) || {};

    _window = window;

    _theme = theme;

    _safeArea = {};
    _safeArea.SF_TOP = device[prefix + 'Top'] || 0;
    _safeArea.SF_LEFT = device[prefix + 'Left'] || 0;
    _safeArea.SF_RIGHT = device[prefix + 'Right'] || 0;
    _safeArea.SF_BOTTOM = device[prefix + 'Bottom'] || 0;

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
        s = [_safeArea[key], themes[_theme][key], themes.default[key]].find(v => v !== undefined);
      } else if (typeof s == 'object' && s.waha !== undefined) {
        const { waha, ...dims } = s;
        s = [dims[Object.keys(dims).find(k => _dimRgx.test(k))], waha].find(v => v !== undefined);
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
    const store = require('../storeUtils').default;
    const [window, setWindow] = useState(() => Dimensions.get('window'));
    const theme = store.useState(s => s.theme.value);

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
