import { Platform } from 'react-native';

const defaultTheme = {
  FONT: Platform.select({ ios: 'Avenir', android: 'sans-serif' }),
  FONT2: Platform.select({ ios: 'AmericanTypewriter', android: 'serif' }),
  IC_FONT: 'IcoMoon',
  FW_LIGHT: '300',
  FW_BOLD: '700',
  FW_HEAVY: '900',
  SP_SMALL: 8,
  SP_NORMAL: 16,
  SP_LARGE: 32,
  SB_BACKGROUND: '@HD_BACKGROUND',
  SB_STYLE: 'dark-content',
  BACKGROUND: '#FFF',
  TEXT: '#000',
  TINT: '#F90',
  TF_BACKGROUND: '#FDFDFD',
  TF_BORDER: '#CCC',
  TF_PLACEHOLDER: '#777',
  TF_KEYBOARD: 'light',
  BT_BACKGROUND: '@TINT',
  BT_TEXT: '#FFF',
  CD_BACKGROUND: '#F9F9F9',
  CD_BORDER: '#DDD',
  ER_BACKGROUND: '#EEE',
  ER_TEXT: '#999',
  HD_SEARCHBG: '#DDD',
  HD_BACKGROUND: '#F9F9F9',
  HD_BORDER: '#DDD',
  HD_TEXT: '#222'
};

const darkTheme = {
  BACKGROUND: '#111',
  TEXT: '#CCC',
  TINT: '#FFB951',
  SV_INDICATOR: 'white',
  SB_STYLE: 'light-content',
  TF_BORDER: '#0F0F0F',
  TF_BACKGROUND: '#333',
  TF_PLACEHOLDER: '#777',
  TF_KEYBOARD: 'dark',
  BT_TEXT: '#333',
  CD_BACKGROUND: '#222',
  CD_BORDER: '#0F0F0F',
  ER_BACKGROUND: '#333',
  ER_TEXT: '#BBB',
  HD_SEARCHBG: '#333',
  HD_BACKGROUND: '#0E0E0E',
  HD_BORDER: '#000',
  HD_TEXT: '#AAA'
};

const themes = {
  default: defaultTheme,
  dark: darkTheme
};

export default themes;
