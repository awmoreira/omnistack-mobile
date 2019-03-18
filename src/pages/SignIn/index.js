import React from 'react';

import {
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

const SignIn = () => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    style={styles.container}
  >
    <View>
      <Text style={styles.title}>Entrar</Text>

      <Text style={styles.label}>E-MAIL</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        autoFocus
        returnKeyType="next"
      />
    </View>
  </KeyboardAvoidingView>
);

export default SignIn;
