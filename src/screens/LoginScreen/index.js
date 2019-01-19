import React from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';
import { apiRequest } from '../../services/ApiService';
import { loginApiAction } from '../../actions/accountActions';
import { store } from '../../services/ReduxService';

export default class LoginScreen extends React.PureComponent {
  state = {
    username: store.getState().account.username || '',
    password: ''
  };

  _login = () => {
    apiRequest(loginApiAction(this.state));
  };

  render() {
    const { username, password } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <Text style={styles.title}>Notes</Text>
          <TextInput
            placeholder="username"
            style={styles.textInput}
            value={username}
            autoCapitalize="none"
            onChangeText={t => this.setState({ username: t })}
          />
          <TextInput
            placeholder="password"
            style={styles.textInput}
            value={password}
            secureTextEntry={true}
            onChangeText={t => this.setState({ password: t })}
          />
          <TouchableOpacity style={styles.button} onPress={this._login}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
