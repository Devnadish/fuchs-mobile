import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../../constants";
import Loader from "../shared/Loader";
import { groupBranchesByCity } from "../../api/groupBranchesByCity";

export default function BranchesList({ setSelectedCity, userLanguage }) {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState([]);

  const getCities = useCallback(async () => {
    setLoading(true);
    const cityData = await groupBranchesByCity(userLanguage);
    setCity(cityData);
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

  const renderItem = useCallback(
    ({ item }) => (
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
    ),
    [handlePressItem, userLanguage]
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    // <View style={styles.flatContainer}>
    <View style={styles.flatContainer}>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <FlatList
          data={city.groupedData}
          keyExtractor={keyExtractor}
          initialNumToRender={4}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          horizontal
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  flatContainer: {
    width: "100%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkerbackgroundColor,
    elevation: 5,
  },
  contentContainer: {
    justifyContent: "center",
    padding: 10,
  },
  pressableItem: {
    width: 90,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  pressableViewContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.primaryBtn,
    backgroundColor: colors.backgroundColor,
    elevation: 3,
    gap: 5,
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
