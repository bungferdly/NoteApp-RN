import StyleSheet from '../../utils/stylesheetUtils';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  itemContainer: {
    marginHorizontal: 15,
    marginVertical: 5,
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
  }
});

export default styles;
