import React, { memo, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../../constants";
import ExpoImage from "../shared/ExpoImage";
import Fontisto from "@expo/vector-icons/Fontisto";

const RenderOfferItem = ({ item, userLanguage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ExpoImage image={item?.image} style={styles.carImage} />
      </View>

      <View style={styles.info}>
        <Text style={styles.rateText}>
          {userLanguage === "ar" ? item?.detailAr : item?.detailEn}
        </Text>
      </View>

      <AddToFavorite />
    </View>
  );
};

export default memo(RenderOfferItem, (prevProps, nextProps) => {
  return prevProps.item?.id === nextProps.item?.id;
});

const AddToFavorite = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handlePress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.touchable}
    >
      <View style={styles.Favcontainer}>
        <Fontisto
          name="pinboard"
          size={24}
          color={isFavorite ? colors.danger : colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 48,
    height: 48,
  },
  Favcontainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "95%",
    backgroundColor: colors.backgroundColor,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.primary,
    overflow: "hidden",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
  },
  carImage: {
    width: "100%",
    height: "100%",
  },
  info: {
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.textColor,
    padding: 5,
    width: "100%",
    opacity: 0.7,
  },
  ratingIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rateText: {
    color: colors.white,
    fontSize: 16,
  },
  seeDetailsContainer: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 5,
    position: "absolute",
    top: 5,
    left: 5,
    elevation: 5,
  },

  seeDetailsText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 16,
  },
});
