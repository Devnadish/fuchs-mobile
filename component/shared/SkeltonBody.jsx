import { StyleSheet, View } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";
import { SkeletonCommonProps } from "../../styles/globalStyle";

export default function SkeletonBody({
  loading,
  howMany = 1,
  height = 250,
  width = "100%",
  radius = 8,
}) {
  return (
    <View style={styles.skeletonContainer}>
      {Array.from({ length: howMany }).map((_, index) => (
        <Skeleton
          key={index}
          height={height}
          width={width}
          radius={radius}
          show={loading}
          {...SkeletonCommonProps}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: 10,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
