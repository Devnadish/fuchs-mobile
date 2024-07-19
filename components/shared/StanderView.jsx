import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StanderView({ children }) {
  return (
    <SafeAreaView className="relative flex-1 w-full  flex flex-col items-center justify-center h-full  ">
      {children}
    </SafeAreaView>
  );
}
