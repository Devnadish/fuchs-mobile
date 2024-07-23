import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Input = ({ label = "khalid", text, setText = () => {}, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleOnChange = (value) => {
    setText(value);
  };

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.labelStyle}>{label}</Text>

      <View
        style={{
          ...styles.inputView,
          borderColor: isFocused ? colors.primary : colors.borderColor,
        }}
      >
        <TextInput
          style={styles.inputStyle}
          {...props}
          onChangeText={(value) => handleOnChange(value)}
          value={text}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {text ? (
          <View style={styles.clearText}>
            <TouchableOpacity onPress={() => setText("")}>
              <MaterialCommunityIcons
                name="close-circle"
                size={24}
                color={colors.borderColor}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    width: Dimensions.get("screen").width * 0.9,
    // backgroundColor: colors.primary,
    marginBottom: 5,
    padding: 4,
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  labelStyle: {
    fontWeight: "ultralight",
    alignSelf: "flex-start",
    color: colors.textColor,
  },
  inputView: {
    position: "relative",
    flexDirection: "row",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    // borderColor: colors.borderColor,
    backgroundColor: colors.white,
    borderRadius: 5,
  },

  inputStyle: {
    padding: 10,
    height: 45,
    borderWidth: 1,
    borderColor: "transparent",
    flexGrow: 1,
  },

  clearText: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
});

export default Input;
