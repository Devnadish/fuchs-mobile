import React, { memo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { colors } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import ExpoImage from "../shared/ExpoImage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const RenderBranchItem = ({ item, userLanguage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ExpoImage image={item?.masterImage} style={styles.carImage} />
      </View>
      <View style={styles.info}>
        <View style={styles.ratingIcon}>
          <AntDesign name="star" size={24} color={colors.yellow} />
          <Text style={styles.rateText}>{item?.usersRate}</Text>
        </View>
        <Text style={styles.rateText}>
          {userLanguage === "ar" ? item?.nameAr : item?.nameEn}
        </Text>
      </View>
      <Pressable
        style={styles.seeDetailsContainer}
        onPress={() => {
          router.push({
            pathname: `(screens)/branch`,
            params: {
              branchId: item?.id,
              branchName: userLanguage === "ar" ? item?.nameAr : item?.nameEn,
            },
          });
        }}
      >
        <Text style={styles.seeDetailsText}>See Details</Text>
      </Pressable>
      <AddToFavorite />
    </View>
  );
};

export default memo(RenderBranchItem, (prevProps, nextProps) => {
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
        <Ionicons
          name="heart"
          size={24}
          color={isFavorite ? colors.danger : colors.white}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 48,
    height: 48,
  },
  Favcontainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.muteColor,
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
