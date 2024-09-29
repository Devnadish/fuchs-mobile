import React, { memo, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "@constants";
import ExpoImage from "@component/shared/ExpoImage";
import Fontisto from "@expo/vector-icons/Fontisto";

const RenderOfferItem = ({ item, userLanguage }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = useCallback(() => {
    setIsFavorite((prev) => !prev);
  }, []);

  return (
    <View style={styles.offerContainer}>
      <View style={styles.imageWrapper}>
        <ExpoImage image={item?.image} style={styles.offerImage} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsBackground}>
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={styles.detailsScroll}
          >
            <Text style={styles.detailsText}>
              {userLanguage === "ar" ? item?.detailAr : item?.detailEn}
            </Text>
          </ScrollView>
        </View>
      </View>

      <AddToFavorite isFavorite={isFavorite} onToggle={handleFavoriteToggle} />
    </View>
  );
};

const AddToFavorite = memo(
  ({ isFavorite, onToggle }) => (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      style={styles.favoriteButton}
    >
      <View style={styles.favoriteContainer}>
        <Fontisto
          name="pinboard"
          size={24}
          color={isFavorite ? colors.danger : colors.primary}
        />
      </View>
    </TouchableOpacity>
  ),
  (prevProps, nextProps) => prevProps.isFavorite === nextProps.isFavorite
);

export default memo(RenderOfferItem, (prevProps, nextProps) => {
  return (
    prevProps.item?.id === nextProps.item?.id &&
    prevProps.userLanguage === nextProps.userLanguage
  );
});

const styles = StyleSheet.create({
  favoriteButton: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 48,
    height: 48,
  },
  favoriteContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  offerContainer: {
    width: "48%", // Each item takes up 48% of the width to fit two per row
    backgroundColor: colors.backgroundColor,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.primary,
    overflow: "hidden",
    alignItems: "center",
    margin: "1%", // Add margin for spacing between items
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
  },
  offerImage: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  detailsBackground: {
    backgroundColor: colors.textColor,
    opacity: 0.7, // Apply opacity to the background
    padding: 5,
  },
  detailsScroll: {
    maxHeight: 100, // Set a maximum height for the info section
  },
  detailsText: {
    color: colors.white, // Keep text color fully opaque
    fontSize: 16,
    opacity: 1, // Ensure text is fully opaque
  },
});
