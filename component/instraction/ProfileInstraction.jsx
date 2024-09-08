import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ProfileInstraction() {
  return (
    <Text style={styles.instructionText}>
      <Text>
        Providing the correct name and email address when making a booking is
        crucial for several reasons. First and foremost, these details are often
        used to generate invoices and confirmations, which serve as official
        records of the transaction. If the name or email is incorrect, it can
        lead to confusion and complications, especially when it comes time to
        verify the booking or make changes
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  instructionText: {
    // textAlign: "center",
    marginBottom: 20,
  },
});
