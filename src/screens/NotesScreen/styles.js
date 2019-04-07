import StyleSheet, { L } from '../../utils/stylesheetUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: () => ({
    paddingTop: 10,
    paddingBottom: L.bottom + 10,
    marginHorizontal: L.left
  }),
  itemContainer: {
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 25,
    borderRadius: 4,
    borderWidth: 1,
    borderBottomWidth: 2,
    backgroundColor: '#F9F9F9',
    borderColor: '#DDD'
  },
  itemTitle: {
    fontSize: 16
  },
  barButtonText: {
    marginRight: 15,
    fontWeight: 'bold',
    color: '#F40'
  },
  footer: {
    margin: 20
  }
});

export default styles;
