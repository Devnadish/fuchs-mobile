import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useUserAuth } from "../../provider/userAuth/userAuthProvider";
import { router } from "expo-router";
import { colors } from "../../constants";
export default function Logout() {
  const { logout } = useUserAuth();
  const handleLogout = () => {
    logout();
    router.push("/(auth)/login");
  };
  return (
    <Pressable onPress={handleLogout} style={styles.logout}>
      <MaterialIcons name="logout" size={24} color={colors.danger} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  logout: {
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
});
