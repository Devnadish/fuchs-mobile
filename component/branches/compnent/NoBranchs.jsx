import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function NoBranchs({ icon, title }) {
  return (
    <View style={styles.nofav}>
      <MaterialCommunityIcons
        name="home-city"
        size={124}
        color={colors.primary}
      />
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nofav: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
