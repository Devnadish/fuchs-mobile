import { View } from "react-native";
import React from "react";
import RenderBranchItem from "./RenderBranchItem";

export default function MapOnBranches({ branches, heartType }) {
  const itemCount = branches.length;
  return (
    <View
      style={{ padding: 10, flexDirection: "row", flexWrap: "wrap", gap: 10 }}
    >
      {branches.map((item) => (
        <RenderBranchItem
          key={item.id}
          item={item}
          heartType={heartType}
          itemCount={itemCount}
        />
      ))}
    </View>
  );
}
