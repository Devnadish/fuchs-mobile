import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="register" />
    <Stack.Screen name="otpScreen" />
    <Stack.Screen name="login" />
  </Stack>
);

export default AuthLayout;
