import StyleSheet, { L, G } from '../../utils/stylesheetUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: G.colors.BACKGROUND_1
  },
  contentContainer: () => ({
    flex: 1,
    paddingHorizontal: L.left
  }),
  logo: {
    display: () => (L.height < 400 ? 'none' : 'flex'),
    alignSelf: 'center'
  },
  title: {
    ...G.texts.H1,
    alignSelf: 'center'
  },
  textInput: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  button: {
    backgroundColor: G.colors.ACCENT_5,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: G.fonts.WEIGHT_BOLD,
    color: G.colors.FOREGROUND_9
  },
  notNowText: {
    marginTop: 20,
    alignSelf: 'center',
    color: 'gray',
    textDecorationLine: 'underline'
  }
});

export default styles;
