import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";
import { SkeletonCommonProps } from "@styles/globalStyle";
import { colors } from "@constants";

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
          key={`skeleton-body-${index}-${Date.now()}`} // Unique key
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

export function SkeletonBodyRow({
  loading,
  howMany = 1,
  height = 250,
  width = "100%",
  radius = 8,
}) {
  return (
    <View style={styles.rowDirection}>
      {Array.from({ length: howMany }).map((_, index) => (
        <View
          style={{
            width: width,
            height: height,
          }}
          key={`skeleton-body-row-${index}-${Date.now()}`}
        >
          <Skeleton
            colorMode={"light"}
            width={"100%"}
            height={height}
            show={loading}
            {...SkeletonCommonProps}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: 10,
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    flexWrap: "wrap",
    flexGrow: 1,
    backgroundColor: colors.backgroundColor,
  },
  rowDirection: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    flexGrow: 1,
    // backgroundColor: colors.green,
  },
});
