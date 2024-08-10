import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants";
import { StatusBar } from "react-native";

export default function SafeArea({ children }) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-start" }}>
      <StatusBar backgroundColor={colors.primary} barStyle={"dark-content"} />
      {children}
    </SafeAreaView>
  );
}
