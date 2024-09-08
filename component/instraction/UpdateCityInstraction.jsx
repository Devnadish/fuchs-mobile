import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function UpdateCityInstraction() {
  return (
    <Text style={styles.instructionText}>
      When you select your city, it helps us provide possibilities tailored just
      for you! By choosing your city, you can easily discover local branches
      that offer exciting deals and services right in your area.
    </Text>
  );
}

const styles = StyleSheet.create({
  instructionText: {
    marginBottom: 20,
  },
});
