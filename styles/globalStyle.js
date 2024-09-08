import { StyleSheet, Dimensions } from "react-native";
import colors from "../constants/colors";

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 18,
    color: colors.textColor,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  scroll: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
};
export const borderRadius = 10;

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
export const baseContainerStyle = {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
};

export const SkeletonCommonProps = {
  colorMode: "light",
  transition: {
    type: "timing",
    duration: 1500,
  },
  backgroundColor: colors.muteColor,
};
