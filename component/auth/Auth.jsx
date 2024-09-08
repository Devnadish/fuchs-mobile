import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../../constants";
import LoginForm from "./login/LoginForm";
import RegisteForm from "./register/RegisteForm";

export default function Auth() {
  const [activeIndex, setActiveIndex] = useState(0); // 0 for Login, 1 for Register

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveIndex(0)}
          style={activeIndex === 0 ? styles.activeTab : styles.inActiveTab}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveIndex(1)}
          style={activeIndex === 1 ? styles.activeTab : styles.inActiveTab}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.selectionContainer}>
          {activeIndex === 0 ? <LoginForm /> : <RegisteForm />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectionContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
    height: "100%",
    // backgroundColor: colors.white,
    minHeight: 350,
    maxHeight: 350,
    maxWidth: 400,
  },
  contentContainer: {
    backgroundColor: colors.white,
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: colors.borderColor,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: 20,
    width: "100%",
    // backgroundColor: colors.secondary,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: colors.green,
  },
  activeTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderTopWidth: 2,
    borderColor: colors.green,
    height: 50,
  },
  inActiveTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundColor,
    height: 50,
  },
});
