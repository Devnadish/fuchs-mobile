import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Txt = ({ title, text, icon, size }) => {
  return (
    <View style={styles.container}>
      {icon && <FontAwesome name={icon} size={24} style={{ marginRight: 5 }} />}

      {title && (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title} : </Text>
      )}

      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Txt;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "auto",
    textTransform: "capitalize",
  },
});
