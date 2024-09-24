import { View } from "react-native";
import React from "react";
import RenderBranchItem from "./RenderBranchItem";

export default function MapOnBranches({ branches, heartType }) {
  return (
    <View style={{ padding: 10 }}>
      {branches.map((item) => (
        <RenderBranchItem key={item.id} item={item} heartType={heartType} />
      ))}
    </View>
  );
}
