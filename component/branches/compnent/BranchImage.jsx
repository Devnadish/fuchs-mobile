import React from "react";
import { View, StyleSheet } from "react-native";
import ExpoImage from "@component/shared/ExpoImage";

const BranchImage = ({ image }) => {
  return (
    <View style={styles.imageContainer}>
      <ExpoImage image={image} style={styles.carImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
  },
  carImage: {
    width: "100%",
    height: "100%",
  },
});

export default BranchImage;
