import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BranchHeader from "./BranchHeader";
import BranchImage from "./BranchImage";
import BranchFooter from "./BranchFooter";
import { colors } from "../../../constants";

export default function RenderBranchItem({ item, heartType }) {
  return (
    <View style={styles.branchContainer}>
      <BranchHeader item={item} />
      <BranchImage image={item?.masterImage} />
      <BranchFooter item={item} heartType={heartType} />
    </View>
  );
}

const styles = StyleSheet.create({
  branchContainer: {
    marginVertical: 5,
    backgroundColor: colors.backgroundColor,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
    overflow: "hidden",
    alignItems: "center",
  },
});
