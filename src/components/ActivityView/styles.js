import StyleSheet from '../../utils/stylesheetUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '@BACKGROUND',
    alignItems: 'center'
  },
  errorContainer: {
    backgroundColor: '@ER_BACKGROUND'
  },
  errorMessage: {
    color: '@ER_TEXT',
    fontSize: 16
  },
  reloadText: {
    fontSize: 16,
    fontWeight: '@FW_BOLD',
    color: '@BT_BACKGROUND',
    marginTop: 20
  }
});

export default styles;
