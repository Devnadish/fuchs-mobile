import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import { colors } from "@constants";
import { RemoveFavorites } from "@api/addTofavorite";

const RemoveFormFavorate = ({ branchId, setRerender }) => {
  const { userId, setRenderData } = useUserAuth();

  const handlePress = async () => {
    const userData = { userId, branchId };
    await RemoveFavorites(userData);
    setRenderData(Date.now());
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.touchable}
    >
      <View style={styles.favContainer}>
        <Ionicons name="heart-dislike" size={24} color={colors.danger} />
      </View>
    </TouchableOpacity>
  );
};

export default RemoveFormFavorate;

const styles = StyleSheet.create({
  favContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 5,
    elevation: 1,
  },
});
