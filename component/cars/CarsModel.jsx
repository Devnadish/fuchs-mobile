import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { colors } from "../../constants";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";

export default function CarsModel({
  carsModel,
  selectedModel,
  setSelectedModel,
  userLanguage,
}) {
  const handleOnPressItemModel = (item) => {
    setSelectedModel({
      modelId: item.id.toString(),
      ModelName: userLanguage === "ar" ? item?.carModelAr : item?.carModelEn,
    });
    // setSelectedModel(item);
  };

  return (
    <FlatList
      data={carsModel}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handleOnPressItemModel(item)}
          style={[
            styles.pressapleItemModel,
            selectedModel && selectedModel.modelId === item.id
              ? {
                  borderWidth: 1.5,
                  borderRadius: 4,
                  backgroundColor: colors.primary,
                }
              : null,
          ]}
        >
          <View style={styles.pressapleContainerModel}>
            <Text style={styles.text}>
              {userLanguage === "ar" ? item.carModelAr : item.carModelEn}
            </Text>
          </View>
        </Pressable>
      )}
      contentContainerStyle={styles.ModelcontentContainer}
      ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
    />
  );
}

const styles = StyleSheet.create({
  ModelcontentContainer: {
    width: "100%",
    padding: 10,
  },
  pressapleItemModel: {
    width: "100%",
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
  },
  pressapleContainerModel: {
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
    color: colors.textColor,
  },
});
