import React from "react";
import { StyleSheet, Dimensions, Text, View } from "react-native";
import { colors } from "@constants";
import { borderRadius, shadowStyle } from "@styles/globalStyle";
import { useTheme } from "@provider/themeProvider/useThemProvider";

const FormContainer = ({ title, icon, children }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.formContainer,
        { borderColor: colors.border, backgroundColor: colors.card },
      ]}
    >
      <View style={[styles.headerContainer, { backgroundColor: colors.card }]}>
        {icon && icon}
        {title && (
          <Text style={[styles.titleText, icon ? styles.titleWithIcon : null]}>
            {title}
          </Text>
        )}
      </View>

      <View style={[styles.contentContainer, { backgroundColor: colors.card }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    width: "100%",
    backgroundColor: colors.white,
  },
  formContainer: {
    width: Dimensions.get("window").width - 30,
    backgroundColor: colors.white,
    borderRadius: borderRadius,
    borderWidth: 1,
    borderColor: colors.borderColor,
    overflow: "hidden",
    // alignItems: "center",
    justifyContent: "center",
    ...shadowStyle,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    width: "100%",
  },
  titleText: {
    fontSize: 16,
    color: colors.primary,
  },
  titleWithIcon: {
    marginLeft: 10, // Add margin if icon is present
  },
});

export default FormContainer;
