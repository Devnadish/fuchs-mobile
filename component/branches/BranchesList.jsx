import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../../constants";
import Loader from "../shared/Loader";
import { groupBranchesByCity } from "../../api/groupBranchesByCity";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function BranchesList({ setSelectedCity, userLanguage }) {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState([]);

  const getCities = useCallback(async () => {
    setLoading(true);
    const cityData = await groupBranchesByCity(userLanguage);
    setCity(cityData.groupedData);
    setLoading(false);
  }, [userLanguage]);

  useEffect(() => {
    getCities();
  }, []);

  const handlePressItem = useCallback(
    (item) => {
      setSelectedCity({
        city: userLanguage === "ar" ? item?.cityAr : item?.cityEn,
      });
    },
    [setSelectedCity, userLanguage]
  );

  const handlePressMycity = useCallback(
    (item) => {
      console.log(item);
    },
    [setSelectedCity, userLanguage]
  );

  const renderItem = useCallback(
    ({ item }) => {
      if (item.mycity) {
        return (
          <Pressable
            onPress={() => handlePressMycity(item)}
            style={styles.pressableItemMyCity}
          >
            <View style={styles.pressableViewContainerMyCity}>
              <Text style={styles.textCity}>MyCity</Text>
              <MaterialIcons
                name="location-city"
                size={20}
                color={colors.primary}
              />
            </View>
          </Pressable>
        );
      }
      return (
        <Pressable
          onPress={() => handlePressItem(item)}
          style={styles.pressableItem}
        >
          <View style={styles.pressableViewContainer}>
            <Text style={styles.textCity}>
              {userLanguage === "ar" ? item.cityAr : item.cityEn}
            </Text>
            <Text style={styles.textCounter}>{item._count.id}</Text>
          </View>
        </Pressable>
      );
    },
    [handlePressItem, userLanguage]
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);
  if (city.length === 0) return null;
  return (
    // <View style={styles.flatContainer}>
    <View style={styles.flatContainer}>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <FlatList
          data={[{ mycity: true }, ...city]}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          horizontal
          showsVerticalScrollIndicator={false}
          windowSize={1}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
        />
      )}
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  flatContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
  contentContainer: {
    justifyContent: "center",
    padding: 10,
  },
  pressableItem: {
    width: "fit-content",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  pressableItemMyCity: {
    width: "fit-content",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  pressableViewContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.primaryBtn,
    backgroundColor: colors.backgroundColor,
    elevation: 3,
    gap: 5,
  },
  pressableViewContainerMyCity: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // height: 40,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.primaryBtn,
    backgroundColor: colors.backgroundColor,
    // gap: 5,
  },
  textCity: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.textColor,
  },
  textCounter: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
    width: 20,
    backgroundColor: colors.muteColor,
    textAlign: "center",
    borderRadius: 5,
  },
});
