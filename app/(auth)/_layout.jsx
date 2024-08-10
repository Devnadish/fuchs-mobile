import React from "react";
import { Stack } from "expo-router";
import {
  createNewUser,
  loginScreen,
  otpScreen,
} from "../../constants/headerBarStyle";
import { NewUserProvider } from "../../provider/newUserProvider/newUserProvider";
import { colors } from "../../constants";
import WhyIregister from "../../component/auth/WhyIregister";
import Logout from "../../component/auth/Logout";

const AuthLayout = () => (
  <NewUserProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="register" options={createNewUser} />

      <Stack.Screen name="otpScreen" options={otpScreen} />
      <Stack.Screen name="login" options={loginScreen} />

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
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          title: "Profile",
          headerTitleAlign: "center",
          headerTintColor: colors.linkColor,
          headerRight: () => <Logout />,
        }}
      />
    </Stack>
  </NewUserProvider>
);

export default AuthLayout;
