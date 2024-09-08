import React from "react";
import { Stack } from "expo-router";

import { NewUserProvider } from "../../provider/newUserProvider/newUserProvider";

const AuthLayout = () => (
  <NewUserProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      {/* <Stack.Screen
        name="city"
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
          animationTypeForReplace: "pop",
          headerShown: false,
        }}
      /> */}

      {/* <Stack.Screen
        name="cars"
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
          animationTypeForReplace: "pop",
          headerShown: false,
        }}
      /> */}

      {/* <Stack.Screen
        name="carModel"
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
          animationTypeForReplace: "pop",
          headerShown: false,
        }}
      /> */}
    </Stack>
  </NewUserProvider>
);

export default AuthLayout;
