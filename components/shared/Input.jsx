import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { colors } from "../../constants";

export default function Input({ label = "khalid", ...props }) {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput style={styles.inputStyle} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    width: Dimensions.get("window").width - 30,
    marginBottom: 10,

    padding: 4,
    gap: 5,
  },
  labelStyle: { fontWeight: "ultralight" },
  inputStyle: {
    // backgroundColor: colors.inputColor,
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 5,
  },
});
