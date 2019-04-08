import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

type Styles<T> = { [P in keyof T]: ViewStyle & TextStyle & ImageStyle };

interface IStyleSheet {
  /**
   *
   * @param styleGenerator
   * Inherit from react-native StyleSheet with additional value :
   * - Theme key : "$[THEME_KEY]" e.g. $BACKGROUND
   * - Safe area : "$SF_TOP", "$SF_LEFT", "$SF_BOTTOM", "$SF_RIGHT"
   * - Constraint : { waha: value1, wxhx: value2, ... } e.g. { waha: 10, wahs: 5 }
   * - - w = width,
   * - - h = height,
   * - - x = one of :
   * - - - s = small, e.g. iPhone 5, split view, landscape height
   * - - - m = medium, e.g. iPhone 6 or more
   * - - - l = large, e.g. iPad
   * - - - a = any, fallback value
   */
  create<T>(styleGenerator: Styles<T>): Styles<T> | { useLayout: () => void };
}

const StyleSheet: IStyleSheet;

export default StyleSheet;
