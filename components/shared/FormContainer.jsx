import React from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { colors } from "../../constants";

const FormContainer = ({ title, icon, children }) => {
  return (
    <KeyboardAvoidingView
      // enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 10,
          marginBottom: 10,
          width: "100%",
        }}
        s
      >
        {icon && icon}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          {title && title}
        </Text>
      </View>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 20,
    backgroundColor: colors.backgroundColor,
    padding: 20,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default FormContainer;
