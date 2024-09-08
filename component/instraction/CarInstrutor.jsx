import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CarInstrutor() {
  return (
    <Text style={styles.instructionText}>
      When you select your car, it allows us to tailor our workshop services
      specifically for your vehicle's needs! By choosing your car model, you can
      easily access specialized maintenance and repair services that ensure your
      vehicle runs smoothly. Our experienced technicians are dedicated to
      providing top-notch care, ensuring your car receives the attention it
      deserves for optimal performance.
    </Text>
  );
}

const styles = StyleSheet.create({
  instructionText: {
    marginBottom: 20,
    padding: 20,
  },
});
