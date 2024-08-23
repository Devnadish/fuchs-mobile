import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import colors from "../../../constants/colors";

const BrHeader = React.memo(({ branchName }) => {
  const handleBackPress = useCallback(() => {
    router.back();
  }, []);

  return (
    <View style={styles.header}>
      <Pressable style={styles.backBtn} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={20} color="black" />
        <Text style={[styles.headerText, { fontSize: 16 }]}>Back</Text>
      </Pressable>
      <Text style={styles.headerText}>{branchName}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    elevation: 5,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "semibold",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default BrHeader;
