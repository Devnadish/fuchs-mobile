import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "@constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = ({
  children,
  style,
  backgroundColor = colors.backgroundColor,
}) => {
  return (
    // <SafeAreaView style={[styles.container, style]}>
    <View style={[styles.content, { backgroundColor }]}>{children}</View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    // alignItems: "center",
    // justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});

export default Container;
