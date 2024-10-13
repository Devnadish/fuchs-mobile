import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useLogin from './useLogin'; // Import the custom hook
import Input from '@component/shared/Input';
import RNBtn from '@component/shared/RNBtn';
import colors from '@constants/colors';
import useIcon from '@hooks/useIcon';
import { router } from 'expo-router';

const LoginForm = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const { loading, handleLogin } = useLogin();

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Login</Text>
      <Input
        label="Mobile"
        placeholder="Enter Mobile"
        text={mobile}
        setText={setMobile}
        validationMsg="Enter Registered mobile"
        required
        maxLength={10}
        keyboardType="numeric"
        icon={useIcon('mobile', 24, colors.muteColor)}
      />
      <Input
        label="Password"
        placeholder="Enter Password"
        text={password}
        setText={setPassword}
        validationMsg="Enter Valid Password"
        required
        secureTextEntry
        icon={useIcon('password', 24, colors.muteColor)}
      />
      <RNBtn
        title="Forget Password"
        handlePress={() => router.push('/(screens)/forgetPassword')}
        textStyles={styles.forgetPasswordText}
        containerStyles={styles.forgetPassword}
      />
      <RNBtn
        title="Login"
        handlePress={() => handleLogin(mobile, password)}
        isLoading={loading}
        loadingText="Logging in..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  forgetPassword: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    width: 150,
  },
  forgetPasswordText: {
    color: colors.linkColor,
  },
});

export default LoginForm;
