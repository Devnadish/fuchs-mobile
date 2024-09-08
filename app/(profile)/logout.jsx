import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import RadioButton from "../../component/shared/RadioButton";
import FormContainer from "../../component/shared/FormContainer";
import { colors } from "../../constants";
import { globalStyle } from "../../styles/globalStyle";
import { router } from "expo-router";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";

export default function Setting() {
  const { logout } = useContext(userAuthContext);
  const handleLogout = () => {
    logout();
    router.push("/(auth)/home");
  };
  return (
    <View style={globalStyle.container}>
      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={{ color: "white" }}>Confirm Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});
