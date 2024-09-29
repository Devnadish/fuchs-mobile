import { StyleSheet } from "react-native";
import { colors } from "@constants";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export const passwordIcon = (
  <MaterialCommunityIcons
    name="form-textbox-password"
    size={20}
    color={colors.muteColor}
  />
);
export const userIcon = (
  <FontAwesome name="user-o" size={24} color={colors.muteColor} />
);
export const registerUserIcon = (
  <FontAwesome5 name="user-plus" size={24} color={colors.white} />
);
export const mobileIcon = (
  <FontAwesome5 name="mobile-alt" size={20} color={colors.muteColor} />
);

export const styles = StyleSheet.create({
  pinContainer: {
    width: "100%",
    height: 50,
  },
  pinCodeContainerStyle: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
  },
  modelOtpButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  otpInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.muteColor,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export const otpSms = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
