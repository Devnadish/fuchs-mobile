import { useState } from "react";
import { showToast } from "@lib/nadish";
import { userLogin } from "@api/login";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Btn from "@component/shared/Btn";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

const ActionButtons = ({ mobile, password, loginFunction, loadAsGuest }) => {
  const [loading, setLoading] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false);

  const handleLogin = async () => {
    if (!mobile || !password) {
      showToast("Please Fill all the fields");
      return;
    }

    const data = { mobile, password };
    const DoLogin = await userLogin(data);

    if (DoLogin === "notExist") {
      showToast("User Not Exist");
      return;
    }

    if (DoLogin === "wrongPassword") {
      showToast("Wrong Password");
      return;
    }

    const userInformation = {
      name: DoLogin.name,
      email: DoLogin.email,
      mobile: DoLogin.mobile,
      avatar: DoLogin.profile.avatar,
      isLogin: true,
    };

    setLoading(true);
    await loginFunction(userInformation);
    setLoading(false);

    router.push("/(home)/home");
  };

  const handleAsGuest = async () => {
    await loadAsGuest();
    router.push("/(home)/home");
  };

  const handleCreateUser = () => {
    router.push("/(auth)/register");
  };
  return (
    <View style={styles.loginViewButton}>
      <Btn
        title="Login"
        handlePress={handleLogin}
        icon={
          <MaterialCommunityIcons name="login" size={24} color={colors.white} />
        }
        isLoading={loading}
        loadingText="Login..."
      />

      <Btn
        title="Create Account"
        handlePress={handleCreateUser}
        containerStyles={{ backgroundColor: colors.green }}
        icon={<AntDesign name="adduser" size={24} color={colors.white} />}
      />
      {/* <View style={styles.loginAsGuestButtonContainer}> */}
      <Btn
        title=" Login As Guest"
        handlePress={handleAsGuest}
        containerStyles={{ backgroundColor: colors.muteColor }}
        icon={
          <MaterialCommunityIcons
            name="account-eye-outline"
            size={24}
            color={colors.white}
          />
        }
        isLoading={loadingGuest}
        loadingText="Login As Guest..."
      />

      {/* </View> */}
    </View>
  );
};

export default ActionButtons;

const CreateAccount = () => (
  <View style={styles.createAccountcontainer}>
    <Text style={{ color: colors.muteColor }}>I Do not have an account </Text>
    <TextLink href={"/(auth)/register"} title="Register" />
  </View>
);

const styles = StyleSheet.create({
  createAccountcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 10,

    marginBottom: 20,
  },
  loginViewButton: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginAsGuestButtonContainer: {
    flexDirection: "row",
    backgroundColor: colors.danger,
    // width: "100%",
    alignItems: "center",
    // justifyContent: "center",
    // padding: 10,
    // gap: 10,
  },
});
