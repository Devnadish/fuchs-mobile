import React, { useCallback, useContext } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../../constants";
import { getCarsById } from "../../api/getCarById";
import { Image } from "expo-image";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import ExpoImage from "../shared/ExpoImage";

export default function CarsList({
  cars,
  selectedCar,
  setSelectedCar,
  setCarsModel,
  setLoadingModel,

  setSelectedYear,
  setSelectedModel,

  userLanguage,
}) {
  const handlePressItem = useCallback(async (item) => {
    // setSelectedCar(item);
    setSelectedCar({
      carId: item.id.toString(),
      carName: userLanguage === "ar" ? item?.carAr : item?.carEn,
    });
    setLoadingModel(true);
    const modelCarsData = await getCarsById(item.id);
    setCarsModel(modelCarsData[0].CarModel);

    setSelectedYear("Select Year");
    setSelectedModel("Select Model");
    setLoadingModel(false);
  }, []);

  const renderItem = React.useCallback(
    ({ item }) => (
      <Pressable
        onPress={() => handlePressItem(item)}
        style={[styles.pressableItem]}
      >
        <View
          style={[
            styles.pressableContainer,
            selectedCar &&
              selectedCar.carId === item.id && {
                backgroundColor: colors.primary,
              },
          ]}
        >
          <View style={styles.imageContiner}>
            <ExpoImage
              image={
                process.env.EXPO_PUBLIC_CLOUDINARY_ENDPOINT + item.public_id
              }
              style={styles.carImage}
            />
            {/* <Image
              source={{
                uri:
                  process.env.EXPO_PUBLIC_CLOUDINARY_ENDPOINT + item.public_id,
              }}
              contentFit="cover"
              transition={1000}
              style={styles.carImage}
            /> */}
          </View>
          <Text style={styles.text}>
            {userLanguage === "ar" ? item.carAr : item.carEn}
          </Text>
        </View>
      </Pressable>
    ),
    [selectedCar, handlePressItem]
  );

  return (
    <FlatList
      data={cars}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      horizontal
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  imageContiner: { width: 60, height: 60 },
  carImage: {
    width: 60,
    height: 60,
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
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textColor,
  },
});
