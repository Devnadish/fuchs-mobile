import React from "react";
import { Stack } from "expo-router";

const ScreensLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="branch"
      options={{ headerShown: false, title: "Branch" }}
    />
  </Stack>
);

export default ScreensLayout;
