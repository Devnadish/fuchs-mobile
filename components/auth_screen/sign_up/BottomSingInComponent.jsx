import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../constants";
import TextLink from "../../shared/TextLink";
export default function BottomSingInComponent() {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>Already Have Account?</Text>
      <TextLink href={"/(auth)/login"} title="LogIn" />
    </View>
  );
}
const styles = StyleSheet.create({
  containter: { flex: 1, justifyContent: "center", alignItems: "center" },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: colors.muteColor,
  },
});
