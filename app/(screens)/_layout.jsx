import React from "react";
import { Stack } from "expo-router";

const ScreensLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="branch"
      options={{
        title: "Branch",
        presentation: "transparentModal",
        animation: "slide_from_bottom",
        animationTypeForReplace: "pop",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="serviceRateInfo"
      options={{
        presentation: "formSheet",
        animation: "slide_from_bottom",
        animationTypeForReplace: "pop",
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" }, // Ensure background is transparent
      }}
    />
    <Stack.Screen
      name="serviceInfo"
      options={{
        presentation: "formSheet",
        animation: "slide_from_bottom",
        animationTypeForReplace: "pop",
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" }, // Ensure background is transparent
      }}
    />
    <Stack.Screen
      name="booking"
      options={{
        presentation: "formSheet",
        animation: "slide_from_bottom",
        animationTypeForReplace: "pop",
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" }, // Ensure background is transparent
      }}
    />
    <Stack.Screen
      name="freegift"
      options={{
        presentation: "formSheet",
        animation: "slide_from_bottom",
        animationTypeForReplace: "pop",
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" }, // Ensure background is transparent
      }}
    />
  </Stack>
);

export default ScreensLayout;
