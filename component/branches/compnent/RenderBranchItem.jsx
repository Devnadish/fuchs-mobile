import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BranchHeader from "./BranchHeader";
import BranchImage from "./BranchImage";
import BranchFooter from "./BranchFooter";
import { colors } from "@constants";

export default function RenderBranchItem({ item, heartType, itemCount }) {
  return (
    <View style={[styles.branchContainer, itemCount === 1 && styles.fullWidth]}>
      <BranchHeader item={item} />
      <BranchImage image={item?.masterImage} />
      <BranchFooter item={item} heartType={heartType} />
    </View>
  );
}

const styles = StyleSheet.create({
  branchContainer: {
    width: "45%",
    marginVertical: 5,
    backgroundColor: colors.backgroundColor,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
    overflow: "hidden",
    alignItems: "center",
    flexGrow: 1,
  },
  fullWidth: {
    width: "100%", // Full width when there's only one item
  },
});
