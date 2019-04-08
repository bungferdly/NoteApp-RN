import StyleSheet from '../../utils/stylesheetUtils';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '@HD_BACKGROUND',
    borderBottomColor: '@HD_BORDER'
  },
  headerTitle: {
    color: '@HD_TEXT'
  },
  container: {
    flex: 1,
    backgroundColor: '@BACKGROUND'
  },
  contentContainer: {
    paddingTop: 15,
    paddingBottom: '@SF_BOTTOM',
    paddingHorizontal: '@SF_LEFT'
  },
  itemContainer: {
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 25,
    borderRadius: 4,
    borderWidth: 1,
    borderBottomWidth: 2,
    backgroundColor: '@CD_BACKGROUND',
    borderColor: '@CD_BORDER'
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: '@FONT2',
    color: '@TEXT'
  },
  barButtonText: {
    marginRight: 15,
    fontWeight: 'bold',
    color: '@BT_BACKGROUND'
  },
  footer: {
    margin: 20
  }
});

export default styles;
