import { StyleSheet, Dimensions } from "react-native";
import colors from "../constants/colors";

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    // backgroundColor: colors.backgroundColor,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 18,
    color: colors.textColor,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  scroll: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
