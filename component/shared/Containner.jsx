import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    alignContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.backgroundColor, // Update with your global style
    alignContent: "center",
  },
});

export default Container;
