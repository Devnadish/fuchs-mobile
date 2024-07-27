import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { memo } from "react";
import { colors } from "../../../constants";

const RenderItem = ({ item, handleOnPressItem }) => {
  return (
    <View style={styles.pressapleContainer}>
      <Pressable onPress={() => handleOnPressItem()}>
        <View style={styles.pressaple}>
          <Text style={styles.whyText}>{item.label}</Text>
        </View>
      </Pressable>
    </View>
  );
};
export default memo(RenderItem);

const styles = StyleSheet.create({
  pressapleContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  pressaple: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.backgroundColor,
  },
  whyText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
