import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    backgroundColor: '#EEE'
  },
  errorMessage: {
    color: '#999',
    fontSize: 16
  },
  reloadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F90',
    marginTop: 20
  }
});

export default styles;
