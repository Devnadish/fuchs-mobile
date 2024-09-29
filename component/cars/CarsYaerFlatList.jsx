import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "@constants";
import { baseContainerStyle } from "@styles/globalStyle";

export default function CarsYearFlatList({
  currentYear,
  setSelectedCar,
  selectedCar,
}) {
  const [selectedYear, setSelectedYear] = useState(null);

  const handlePressItem = useCallback(
    (item) => {
      setSelectedYear(item);
      setSelectedCar((prevSelectedCar) => ({
        ...prevSelectedCar,
        year: item,
      }));
    },
    [setSelectedCar]
  );

  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const renderItem = useCallback(
    ({ item }) => {
      const isSelected = selectedYear === item;

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
            <Text style={[styles.text, isSelected && styles.selectedText]}>
              {item}
            </Text>
          </View>
        </Pressable>
      );
    },
    [selectedYear, handlePressItem]
  );

  return (
    <View style={styles.yearContainer}>
      <FlatList
        data={years}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        horizontal
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  yearContainer: {
    ...baseContainerStyle,
    padding: 5,
    backgroundColor: colors.backgroundColor,
    height: 70,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    height: 60,
  },
  pressableItem: {
    width: 80,
    height: 40,
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
  selectedText: {
    color: colors.white, // Change this to the desired color when selected
  },
});
