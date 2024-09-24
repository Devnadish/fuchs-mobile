import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import Btn from "../../shared/Btn";
import { showToast } from "../../../lib/nadish";
import Input from "../../shared/Input";
import colors from "../../../constants/colors";
import TextLink from "../../shared/TextLink";
import { loginIcon, mobileIcon, passwordIcon } from "./loginLogic";
import {
  userAuthContext,
  useUserAuth,
} from "../../../provider/userAuth/userAuthProvider";
import { userLogin } from "../../../api/login";
import { router } from "expo-router";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const { loginFunction } = useUserAuth();

  const handleLogin = async () => {
    const data = { mobile, password };

    // Start loading state
    setLoading(true);

    try {
      const response = await userLogin(data);

      // Handle response status codes 400-401-402-500
      if (response.statusCode >= 400) {
        showToast(response.message);
        return;
      }

      const userInformation = {
        userId: response.id,
        userName: response.name,
        userEmail: response.email,
        userMobile: response.mobile,
        userAvatar: response.profile.avatar,
        userRole: response.role,

        userCity: response.profile.city,
        userCityId: response.profile.cityId,
        userLanguage: response.profile.language || "en",
        userTheme: response.profile.theme || "light",

        userCar: response.car.car,
        userCarId: response.car.carId,
        userModelId: response.car.modelId,
        userCarModel: response.car.carModel,
        userCarYear: response.car.carYear,

        isLogin: true,
      };

      // Call the login function with user information
      await loginFunction(userInformation);

      // Navigate to home screen
      router.push("/(home)/home");
    } catch (error) {
      // Handle any unexpected errors
      showToast("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    } finally {
      // Stop loading state
      setLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Input
          label="Mobile"
          placeholder="Enter Mobile"
          text={mobile}
          setText={setMobile}
          validationMsg="Enter Registered mobile"
          required
          maxLength={10}
          keyboardType="numeric"
          icon={mobileIcon}
        />
        <Input
          label="Password"
          placeholder="Enter Password"
          text={password}
          setText={setPassword}
          validationMsg="Enter Valid Password"
          required
          icon={passwordIcon}
        />
        <View style={styles.forgotPasswordView}>
          <TextLink
            href={"/(screens)/forgetPassword"}
            title="Forget Password"
            textStyles={{ fontSize: 12 }}
          />
        </View>
      </View>

      <Btn
        title="Login"
        handlePress={handleLogin}
        icon={loginIcon}
        isLoading={loading}
        loadingText="Logging in..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    height: "100%",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPasswordView: {
    width: "100%",
    alignItems: "flex-end",
  },
});

export default React.memo(LoginForm);
