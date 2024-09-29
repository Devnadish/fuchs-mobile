import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "@constants";
import BranchImage from "./compnent/BranchImage";
import BranchHeader from "./compnent/BranchHeader";
import BranchFooter from "./compnent/BranchFooter";

const RenderBranchItem = ({ item, setRerender, queyType }) => {
  return (
    <View style={styles.container}>
      <BranchHeader item={item} setRerender={setRerender} queyType={queyType} />
      <BranchImage image={item?.masterImage} />
      <BranchFooter item={item} setRerender={setRerender} queyType={queyType} />
    </View>
  );
};

export default memo(RenderBranchItem, (prevProps, nextProps) => {
  return prevProps.item?.id === nextProps.item?.id;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    backgroundColor: colors.backgroundColor,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
    overflow: "hidden",
    alignItems: "center",
    width: "100%", // Adjust width to fit two items per row
    borderColor: colors.borderColor,
  },
});
