import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function activeBooking() {
  return (
    <>
      <Stack.Screen options={{ title: `Active Booking`, headerShown: true }} />
      <View>
        <Text>activeBooking</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
