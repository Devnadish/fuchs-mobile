import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@constants";

export default function BackBtn() {
  router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <Pressable title="Back" onPress={goBack} style={styles.backBtn}>
      <View onPress={goBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    top: "30%",
    left: 10,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
});
