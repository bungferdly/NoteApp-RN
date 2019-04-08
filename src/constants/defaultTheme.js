import { Platform } from 'react-native';

const defaultTheme = {
  FONT: Platform.select({ ios: 'Avenir', android: 'sans-serif' }),
  FONT2: Platform.select({ ios: 'AmericanTypewriter', android: 'serif' }),
  FW_LIGHT: '300',
  FW_BOLD: '700',
  FW_HEAVY: '900',
  SB_BACKGROUND: '@HD_BACKGROUND',
  SB_STYLE: 'dark-content',
  BACKGROUND: '#FFF',
  TEXT: '#000',
  TF_BACKGROUND: '#FDFDFD',
  TF_BORDER: '#CCC',
  TF_PLACEHOLDER: '#777',
  TF_KEYBOARD: 'light',
  BT_BACKGROUND: '#F90',
  BT_TEXT: '#FFF',
  CD_BACKGROUND: '#F9F9F9',
  CD_BORDER: '#DDD',
  ER_BACKGROUND: '#EEE',
  ER_TEXT: '#999',
  HD_BACKGROUND: '#F9F9F9',
  HD_BORDER: '#DDD',
  HD_TEXT: '#222'
};

export default defaultTheme;
