import "react-native-gesture-handler";
import React from "react";
import { Stack } from "expo-router";
import { LanguageProvider } from "../provider/languageProvider/languageProvider";
import { UserAuthProvider } from "../provider/userAuth/userAuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { indexBarStyle } from "../constants/headerBarStyle";
import { pingServer, showToast } from "../lib/nadish";

const RootLayout = () => {
  const check = pingServer();
  check
    ? showToast("Server is reachable and responsive")
    : showToast("Server is not reachable or unresponsive");
  return (
    <UserAuthProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <LanguageProvider>
            <Stack>
              <Stack.Screen name="index" options={indexBarStyle} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
              <Stack.Screen name="(profile)" options={{ headerShown: false }} />
              {/* <Stack.Screen name="(user)" /> */}
            </Stack>
          </LanguageProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </UserAuthProvider>
  );
};

export default RootLayout;
