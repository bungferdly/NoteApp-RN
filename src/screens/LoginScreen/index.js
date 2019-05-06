import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Text,
  Image,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import TextField from '../../components/TextField';
import { login } from '../../actions/accountActions';
import { toggleTheme } from '../../actions/themeActions';
import store from '../../utils/storeUtils';
import styles from './styles';

function LoginScreen() {
  const initialUsername = store.useState(s => s.account.username);
  const [username, setUsername] = useState(initialUsername || '');
  const [password, setPassword] = useState('');
  styles.useLayout();

  function doLogin() {
    login({ username, password });
  }

  function doToggleTheme() {
    toggleTheme();
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
          <View style={styles.container} />
          <Image testID="LOGO" style={styles.logo} source={require('../../res/logo-app.png')} />
          <View>
            <Text style={styles.title}>Notes</Text>
          </View>
          <View style={styles.container} />
          <TextField
            testID="USERNAME_INPUT"
            placeholder="username"
            style={styles.textInput}
            value={username}
            autoCapitalize="none"
            onChangeText={setUsername}
          />
          <TextField
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
          <TouchableOpacity testID="THEME_BTN" style={styles.button} onPress={doToggleTheme}>
            <Text style={styles.buttonText}>TOGGLE THEME</Text>
          </TouchableOpacity>
          <View style={styles.container} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
