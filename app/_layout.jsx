import "react-native-gesture-handler";
import React from "react";
import { Stack } from "expo-router";
import { LanguageProvider } from "../provider/languageProvider/languageProvider";
import { colors } from "../constants";
import { UserAuthProvider } from "../provider/userAuth/userAuthProvider";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <UserAuthProvider>
          <LanguageProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="(auth)" />

              <Stack.Screen name="(home)" />

              <Stack.Screen name="(user)" />
            </Stack>
          </LanguageProvider>
        </UserAuthProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
