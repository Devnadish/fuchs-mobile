import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import colors from "@constants/colors";

const BarHeader = React.memo(({ title, icon }) => {
  const handleBackPress = useCallback(() => {
    router.back();
  }, []);

  return (
    <View style={styles.header}>
      <Pressable style={styles.backBtn} onPress={handleBackPress}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </Pressable>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={styles.headerText}>{title}</Text>
        {icon && icon}
      </View>
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
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "semibold",
  },
  backBtn: {
    width: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default BarHeader;
