import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { colors } from "@constants";

const Btn = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  loadingText = "Loading...",
  icon,
  type,
  ...props
}) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <ActivityIndicator color="#fff" size="small" />
          <Text style={[styles.text, textStyles]}>{loadingText}</Text>
        </>
      );
    }
    return (
      <>
        {icon && icon}
        <Text style={[styles.text, textStyles]}>{title}</Text>
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.btnStyle, containerStyles]}
      disabled={isLoading}
      {...props}
    >
      <View style={styles.innerView}>{renderContent()}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.primaryBtn,
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 20,
    height: 50,
  },
  linkBtnStyle: {
    padding: 5,
  },
  innerView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  text: {
    color: colors.backgroundColor,
    fontSize: 14,
    textTransform: "capitalize",
  },
  linkText: {
    color: colors.linkColor,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Btn;
