import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="register" />
    <Stack.Screen name="otpScreen" />
    <Stack.Screen name="login" />
    <Stack.Screen
      name="city"
      options={{
        presentation: "transparentModal",
        animation: "slide_from_bottom",
        animationTypeForReplace: "pop",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="cars"
      options={{
        presentation: "transparentModal",
        animation: "slide_from_bottom",
        animationTypeForReplace: "pop",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="carModel"
      options={{
        presentation: "transparentModal",
        animation: "slide_from_bottom",
        animationTypeForReplace: "pop",
        headerShown: false,
      }}
    />
  </Stack>
);

export default AuthLayout;
