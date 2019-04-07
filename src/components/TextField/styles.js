import StyleSheet, { G } from '../../utils/stylesheetUtils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: G.colors.BACKGROUND_2,
    borderColor: G.colors.BORDER_5,
    color: G.colors.FOREGROUND_1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1
  },
  placeholderColor: G.colors.FOREGROUND_4,
  keyboardAppearance: ['light', 'dark']
});

export default styles;
