import React, { useCallback } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../../constants";

export default function CarsYear({
  selectedYear,
  setSelectedYear,
  currentYear,
}) {
  const handlePressItem = useCallback(async (item) => {
    setSelectedYear(item);
  }, []);

  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const renderItem = React.useCallback(
    ({ item }) => (
      <Pressable
        onPress={() => handlePressItem(item)}
        style={[styles.pressableItem]}
      >
        <View
          style={[
            styles.pressableContainer,
            selectedYear &&
              selectedYear === item && {
                backgroundColor: colors.primary,
              },
          ]}
        >
          <Text style={styles.text}>{item}</Text>
        </View>
      </Pressable>
    ),
    [selectedYear, handlePressItem]
  );

  return (
    <FlatList
      data={years}
      keyExtractor={(item) => item.toString()}
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
    padding: 5,
    height: 60,
  },

  pressableItem: {
    width: 80,
    height: 40,
    margin: "auto",
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
