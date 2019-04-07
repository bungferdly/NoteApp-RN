import { Platform } from 'react-native';

const colors = {
  BACKGROUND_1: ['#FFF', '#000'],
  BACKGROUND_2: ['#FDFDFD', '#333'],
  BACKGROUND_3: ['#F6F6F6', '#444'],
  FOREGROUND_1: ['#000', '#EEE'],
  FOREGROUND_2: ['#222', '#DDD'],
  FOREGROUND_4: ['#777', '#AAA'],
  FOREGROUND_9: ['#FFF', '#000'],
  BORDER_5: ['#CCC', '#222'],
  ACCENT_5: ['#F90', '#C70']
};

const fonts = {
  FAMILY_1: Platform.select({ ios: 'Avenir', android: 'sans-serif' }),
  FAMILY_2: Platform.select({ ios: 'AmericanTypewriter', android: 'serif' }),
  WEIGHT_LIGHT: '300',
  WEIGHT_BOLD: '700',
  WEIGHT_HEAVY: '900'
};

const texts = {
  H1: {
    color: colors.FOREGROUND_1,
    fontFamily: fonts.FAMILY_1,
    fontWeight: fonts.WEIGHT_HEAVY,
    fontSize: 40
  }
};

const globalStyles = {
  colors,
  fonts,
  texts
};

export default globalStyles;
