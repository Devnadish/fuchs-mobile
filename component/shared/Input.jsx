import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DissmissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const Input = ({
  label = "khalid",
  text,
  setText = () => {},
  reqierd = false,

  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [validationMsg, setValidationMsg] = useState(null);

  const handleOnChange = (value) => {
    setText(value);
  };

  return (
    <DissmissKeyboard>
      <View style={styles.viewStyle}>
        <View style={styles.labelView}>
          <Text style={styles.labelStyle}>{label}</Text>
          {reqierd && <Text style={styles.reqierd}>*</Text>}
        </View>

        <View
          style={[
            styles.inputView,
            { borderColor: isFocused ? colors.primary : colors.borderColor },
          ]}
        >
          {props.icon && <View style={styles.iconStyle}>{props.icon}</View>}
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
    </DissmissKeyboard>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    width: Dimensions.get("screen").width * 0.9,
    // backgroundColor: colors.primary,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  iconStyle: { padding: 10 },
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
    backgroundColor: colors.white,
    borderRadius: 5,
  },

  reqierd: {
    color: "red",
    fontSize: 14,
  },
  inputStyle: {
    padding: 10,
    height: 45,
    borderWidth: 1,
    borderColor: "transparent",
    flexGrow: 1,
  },
  validationMsg: {
    position: "absolute",
    bottom: -20,
    right: 0,
    color: "red",
  },

  clearText: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },

  labelView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 5,
  },
});

export default Input;
