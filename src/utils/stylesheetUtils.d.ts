import { ViewStyle, TextStyle, ImageStyle, ScaledSize } from 'react-native';
import globalStyles from '../constants/globalStyles';

type Styles<T> = { [P in keyof T]: ViewStyle & TextStyle & ImageStyle };
type Layout = ScaledSize | { left: Number; right: Number; top: Number; bottom: Number };

interface IStyleSheet {
  create<T>(styleGenerator: Styles<T>): Styles<T> | { useLayout(): void };
}

const StyleSheet: IStyleSheet;

export const L: Layout;
export const G = globalStyles;

export default StyleSheet;
