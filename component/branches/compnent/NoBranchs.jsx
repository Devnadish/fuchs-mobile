import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function NoBranchs({ icon, title }) {
  return (
    <View style={styles.nofav}>
      {icon}
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
