import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 60,
    fontSize: 40
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    marginHorizontal: 20,
    marginVertical: 10
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#F90',
    paddingHorizontal: 10,
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white'
  },
  notNowText: {
    marginTop: 20,
    alignSelf: 'center',
    color: 'gray',
    textDecorationLine: 'underline'
  }
});

export default styles;
