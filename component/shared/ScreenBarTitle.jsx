import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ScreenBarTitle({ title = "Title", icon }) {
  return (
    <View style={styles.container}>
      {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
