import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@constants";

export default function LetterAsAvatar({ letter }) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.muteColor,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
