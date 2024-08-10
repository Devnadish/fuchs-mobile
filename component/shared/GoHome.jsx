import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

export default function GoHome() {
  return (
    <View style={{ marginRight: 10 }}>
      <Entypo
        name="home"
        size={24}
        color="black"
        onPress={() => router.push("/(home)/home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
