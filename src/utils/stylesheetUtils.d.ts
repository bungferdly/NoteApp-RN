import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

type Styles<T> = { [P in keyof T]: ViewStyle & TextStyle & ImageStyle };

interface IStyleSheet {
  /**
   * @param styleGenerator
   * Inherit from react-native StyleSheet with additional value :
   * - Theme : "&#64;xxx" e.g. "&#64;BACKGROUND"
   * - Safe area : "&#64;SF_TOP" | "&#64;SF_LEFT" | "&#64;SF_BOTTOM" | "&#64;SF_RIGHT"
   * - Constraints : { waha: value1, wxhx: value2, ... } e.g. { waha: 10, wahs: 5 }
   * - - w = width, h = height, a = any, x = one of :
   * - - - s = small, e.g. iPhone 5, split view, or landscape height
   * - - - m = medium, e.g. iPhone 6 or more
   * - - - l = large, e.g. iPad or landscape width
   */
  create<T>(styleGenerator: Styles<T>): Styles<T> | { useLayout: () => void };
}

const StyleSheet: IStyleSheet;

export default StyleSheet;
