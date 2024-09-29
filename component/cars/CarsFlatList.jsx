import React, { useCallback } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "@constants";
import ExpoImage from "@component/shared/ExpoImage";
import { Skeleton } from "moti/skeleton";
import { baseContainerStyle, SkeletonCommonProps } from "@styles/globalStyle";

export default function CarsFlatList({
  selectedCar,
  setSelectedCar,
  cars,
  setCarsModel,
  userLanguage,
  loading, // Prop to indicate loading state
}) {
  const handlePressItem = useCallback(
    (item) => {
      setSelectedCar({
        carId: item.id.toString(),
        car: userLanguage === "ar" ? item?.carAr : item?.carEn,
        modelId: null,
        model: "select model",
        year: "select year",
      });
      setCarsModel(item.CarModel);
    },
    [setSelectedCar, setCarsModel, userLanguage]
  );

  const renderItem = useCallback(
    ({ item }) => {
      const isSelected = selectedCar?.carId === item.id;

      return (
        <Pressable
          onPress={() => handlePressItem(item)}
          style={styles.pressableItem}
        >
          <View
            style={[
              styles.pressableContainer,
              isSelected && { backgroundColor: colors.primary },
            ]}
          >
            <View style={styles.imageContainer}>
              <ExpoImage
                image={`${process.env.EXPO_PUBLIC_CLOUDINARY_ENDPOINT}${item.public_id}`}
                style={styles.carImage}
                fit="contain"
              />
            </View>
            <Text style={[styles.text, isSelected && styles.selectedText]}>
              {userLanguage === "ar" ? item.carAr : item.carEn}
            </Text>
          </View>
        </Pressable>
      );
    },
    [selectedCar, handlePressItem, userLanguage]
  );

  // Render skeleton when loading
  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      <Skeleton
        width={90}
        height={90}
        borderRadius={8}
        {...SkeletonCommonProps}
      />
    </View>
  );

  return (
    <View style={styles.carContainer}>
      <FlatList
        data={loading ? Array(5).fill({}) : cars} // Show skeletons if loading
        keyExtractor={(item, index) =>
          loading ? index.toString() : item.id.toString()
        }
        renderItem={loading ? renderSkeleton : renderItem}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        horizontal
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carContainer: {
    ...baseContainerStyle,
    backgroundColor: colors.backgroundColor,
    height: 120,
    padding: 10,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  carImage: {
    width: 50,
    height: 50,
    aspectRatio: 1,
    borderRadius: 12,
  },
  pressableItem: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  pressableContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.textColor,
    textTransform: "capitalize",
  },
  selectedText: {
    color: colors.white, // Change text color when selected
  },
  separator: {
    width: 10,
  },
  skeletonContainer: {
    width: 90,
    height: 90,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
