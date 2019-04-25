import StyleSheet from '../../utils/stylesheetUtils';

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 15,
    marginBottom: '@SF_BOTTOM',
    marginHorizontal: '@SF_LEFT'
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
  footer: {
    margin: 20
  }
});

export default styles;
