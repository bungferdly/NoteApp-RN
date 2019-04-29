import StyleSheet from '../../utils/stylesheetUtils';

const styles = StyleSheet.create({
  topHeight: '@SF_TOP',
  barHeight: { waha: 46, wahs: 30 },
  barHide: { waha: false, wahs: true },
  bigHeight: { waha: 50, wahs: 0 },
  searchBarHeight: { waha: 45, wahs: 30 },
  background: {
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: '@SF_LEFT',
    borderBottomColor: '@HD_BORDER',
    backgroundColor: '@HD_BACKGROUND',
    borderBottomWidth: 1,
    elevation: 2
  },
  bigBackground: {
    backgroundColor: '@BACKGROUND',
    borderBottomWidth: 0,
    elevation: 0
  },
  barContainer: {
    marginTop: '@SF_TOP',
    overflow: 'hidden'
  },
  bar: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: { waha: 46, wahs: 30 }
  },
  left: {
    flexDirection: 'row'
  },
  mid: {
    flex: 1,
    alignItems: 'center'
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  title: {
    fontFamily: '@FONT',
    color: '@TEXT',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  titleBig: {
    height: 0,
    opacity: 0,
    alignSelf: 'center',
    fontSize: 36
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginHorizontal: 5,
    color: '@TINT',
    fontSize: 30
  },
  text: {
    color: '@TINT',
    marginHorizontal: 8,
    fontSize: 16
  },
  searchBar: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: '@SP_NORMAL',
    borderRadius: 50,
    backgroundColor: '@HD_SEARCHBG',
    marginBottom: { waha: 10, wahs: 3 }
  }
});

export default styles;
