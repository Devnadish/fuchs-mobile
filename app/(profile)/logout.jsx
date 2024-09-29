import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { globalStyle } from "@styles/globalStyle";
import { router } from "expo-router";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";

export default function Setting() {
  const { logout } = useUserAuth();
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
