import React from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../actions/accountActions';
import styles from './styles';

const mapStateToProps = state => ({
  initialUsername: state.account.username
});

class LoginScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: props.initialUsername || '',
      password: ''
    };
  }

  _login = () => {
    this.props.login(this.state).then(() => {
      this.props.navigation.navigate('App');
    });
  };

  render() {
    const { username, password } = this.state;
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
            onChangeText={t => this.setState({ username: t })}
          />
          <TextInput
            testID="PASSWORD_INPUT"
            placeholder="password"
            style={styles.textInput}
            value={password}
            secureTextEntry={true}
            onChangeText={t => this.setState({ password: t })}
          />
          <TouchableOpacity testID="LOGIN_BTN" style={styles.button} onPress={this._login}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  mapStateToProps,
  { login }
)(LoginScreen);
