import "react-native-gesture-handler";
import React from "react";
import { Stack } from "expo-router";
import { LanguageProvider } from "../provider/languageProvider/languageProvider";
import { UserAuthProvider } from "../provider/userAuth/userAuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { carBarStyle, indexBarStyle } from "../constants/headerBarStyle";
import { pingServer, showToast } from "../lib/nadish";

const RootLayout = () => {
  const check = pingServer();
  check
    ? showToast("Server is reachable and responsive")
    : showToast("Server is not reachable or unresponsive");
  return (
    <UserAuthProvider>
      <GestureHandlerRootView>
        <LanguageProvider>
          <Stack>
            <Stack.Screen name="index" options={indexBarStyle} />
            {/* <Stack.Screen name="selectcar" options={carBarStyle} /> */}
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
            <Stack.Screen name="(profile)" options={{ headerShown: false }} />
            <Stack.Screen name="(screens)" options={{ headerShown: false }} />
          </Stack>
        </LanguageProvider>
      </GestureHandlerRootView>
    </UserAuthProvider>
  );
};

export default RootLayout;
