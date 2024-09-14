import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function PinOffers() {
  return (
    <>
      <Stack.Screen
        options={{ title: `Favorite Branches`, headerShown: true }}
      />
      <View>
        <Text>PinOffers</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
