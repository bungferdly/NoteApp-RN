import StyleSheet from '../../utils/stylesheetUtils';
import G from '../../constants/globalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '@BACKGROUND'
  },
  contentContainer: {
    width: '100%',
    maxWidth: 640,
    paddingHorizontal: '@SF_LEFT'
  },
  logo: {
    display: { waha: 'flex', wahs: 'none' },
    alignSelf: 'center'
  },
  title: {
    ...G.H1,
    marginBottom: 50,
    alignSelf: 'center'
  },
  textInput: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  button: {
    backgroundColor: '@BT_BACKGROUND',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: '@FW_BOLD',
    color: '@BT_TEXT'
  },
  notNowText: {
    marginTop: 20,
    alignSelf: 'center',
    color: 'gray',
    textDecorationLine: 'underline'
  }
});

export default styles;
