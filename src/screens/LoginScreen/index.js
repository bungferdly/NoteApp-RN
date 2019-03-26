import React, { useState } from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../actions/accountActions';
import styles from './styles';

const mapStateToProps = state => {
  return { initialUsername: state.account.username };
};

function LoginScreen(props) {
  const [username, setUsername] = useState(props.initialUsername || '');
  const [password, setPassword] = useState('');

  function doLogin() {
    props.login({ username, password }).then(() => {
      props.navigation.navigate('App');
    });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text style={styles.title}>Notes</Text>
        <TextInput
          testID="USERNAME_INPUT"
          placeholder="username"
          style={styles.textInput}
          value={username}
          autoCapitalize="none"
          onChangeText={setUsername}
        />
        <TextInput
          testID="PASSWORD_INPUT"
          placeholder="password"
          style={styles.textInput}
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TouchableOpacity testID="LOGIN_BTN" style={styles.button} onPress={doLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default connect(
  mapStateToProps,
  { login }
)(LoginScreen);
