import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function FavBrnanches() {
  return (
    <>
      <Stack.Screen
        options={{ title: `Favorite Branches`, headerShown: true }}
      />
      <View>
        <Text>FavBrnanches</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
