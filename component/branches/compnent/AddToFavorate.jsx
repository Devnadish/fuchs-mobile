import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserAuth } from "../../../provider/userAuth/userAuthProvider";
import { colors } from "../../../constants";
import { addToFavorites } from "../../../api/addTofavorite";

const AddToFavorate = ({ branchId, isFavoriteCheck }) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteCheck);
  const { userId, setRenderData, renderData } = useUserAuth();

  const handlePress = async () => {
    const userData = { userId, branchId };
    await addToFavorites(userData);
    setIsFavorite(true);
    setRenderData((pre) => Date.now()); // Trigger re-render to update favorite count
    // console.log("when add:", { renderData });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.touchable]}
      disabled={isFavorite}
    >
      <View
        style={[
          styles.favContainer,
          { backgroundColor: isFavorite ? colors.white : colors.primary },
        ]}
      >
        <Ionicons
          name="heart"
          size={24}
          color={isFavorite ? colors.danger : colors.white}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AddToFavorate;

const styles = StyleSheet.create({
  favContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
});
