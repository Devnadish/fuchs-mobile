import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Skeleton } from "moti/skeleton";
import { colors } from "../../../constants";
import { SkeletonCommonProps } from "../../../styles/globalStyle";

const SkeletonText = ({ show, children }) => (
  <Skeleton
    height={30}
    width={"100%"}
    radius={10}
    {...SkeletonCommonProps}
    show={show}
  >
    {children}
  </Skeleton>
);

const ServiceDetail = memo(({ Title, description, icon }) => {
  return (
    <View style={styles.serviceInfoContainer}>
      <View style={styles.textContainer}>
        <SkeletonText show={!Title}>
          <Text style={styles.infoTitle}>{Title}</Text>
        </SkeletonText>
        <SkeletonText show={!description}>
          <Text style={styles.infoDescription}>{description}</Text>
        </SkeletonText>
      </View>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
    </View>
  );
});

const styles = StyleSheet.create({
  serviceInfoContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
  },
  iconContainer: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.textColor,
  },
  infoDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.muteColor,
  },
});

export default ServiceDetail;
