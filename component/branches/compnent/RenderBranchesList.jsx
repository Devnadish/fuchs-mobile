import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LetterAsAvatar from "../../shared/LetterAsAvatar";
import { router } from "expo-router";
import { colors } from "../../../constants";
import MoreArrow from "../../shared/MoreArrow";

export default function RenderBranchesList({ cities, userLanguage }) {
  const handlePressItem = useCallback(
    (item) => {
      const cityName = userLanguage === "ar" ? item.cityAr : item.cityEn;
      router.push({
        pathname: "/(screens)/displayBranches",
        params: { cityId: item._min.cityId, cityName },
      });
    },
    [userLanguage]
  );

  return (
    <View style={styles.container}>
      {cities.map((item) => {
        const cityName = userLanguage === "ar" ? item.cityAr : item.cityEn;
        return (
          <Pressable
            key={item._min.cityId}
            onPress={() => handlePressItem(item)}
            style={styles.pressableItem}
          >
            <View style={styles.itemContainer}>
              <LetterAsAvatar letter={cityName.charAt(0)} />
              <Text style={styles.textCity}>{cityName}</Text>
              <View style={styles.counterContainer}>
                <Text style={styles.textCounter}>{item._count.id}</Text>
                <MoreArrow />
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    padding: 10,
  },
  pressableItem: {
    width: "100%",
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: "100%",
  },
  textCity: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.textColor,
    flex: 1,
    marginLeft: 10,
  },
  textCounter: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.muteColor,
    width: 20,
    textAlign: "center",
    borderRadius: 5,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
