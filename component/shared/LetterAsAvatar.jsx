import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@constants";

export default function LetterAsAvatar({ letter, primaryColor }) {
  return (
    <View style={[styles.avatar, primaryColor && styles.primaryAvatar]}>
      <Text style={styles.avatarText}>{letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.muteColor, // Default background color
    justifyContent: "center",
    alignItems: "center",
  },
  primaryAvatar: {
    backgroundColor: colors.primary, // Background color when primaryColor is true
  },
  avatarText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
