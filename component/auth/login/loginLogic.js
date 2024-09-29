import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@constants";
import { StyleSheet } from "react-native";
export const mobileIcon = (
  <FontAwesome5 name="mobile-alt" size={20} color={colors.muteColor} />
);

export const passwordIcon = (
  <MaterialCommunityIcons
    name="form-textbox-password"
    size={20}
    color={colors.muteColor}
  />
);
export const loginIcon = (
  <MaterialCommunityIcons name="login" size={24} color={colors.white} />
);

export const styles = StyleSheet.create({
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
  forgotPasswordView: {
    width: "100%",
    alignItems: "flex-end",
  },
});
