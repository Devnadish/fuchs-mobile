import React from "react";
import { Stack } from "expo-router";
import { LanguageProvider } from "../provider/languageProvider/languageProvider";
import { StatusBar } from "expo-status-bar";

import { colors } from "../constants";
import { UserAuthProvider } from "../provider/userAuth/userAuthProvider";
import { Image, Text } from "react-native";
import { View } from "react-native-animatable";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <UserAuthProvider>
          <LanguageProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          marginRight: "auto",
                          fontSize: 16,
                          fontWeight: "semibold",
                        }}
                      >
                        <Text>Welcome </Text> Back,
                      </Text>
                    </View>
                  ),
                  // headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="(home)"
                options={{
                  headerShown: false,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="(auth)"
                options={{
                  headerStyle: {
                    backgroundColor: "#f45115",
                  },
                  headerTintColor: "#f00",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="(user)"
                options={{
                  headerShown: true,
                  headerTitle: "khalid nadish",
                  headerStyle: {
                    backgroundColor: colors.white,
                  },
                  headerTintColor: colors.primary,
                  headerTitleStyle: {
                    fontWeight: "light",
                  },
                }}
              />
            </Stack>
          </LanguageProvider>
        </UserAuthProvider>
      </SafeAreaProvider>
    </>
  );
};

export default RootLayout;
