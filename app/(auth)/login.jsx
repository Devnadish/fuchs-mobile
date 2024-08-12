import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors } from "../../constants";
import FormContainer from "../../component/shared/FormContainer";
import Input from "../../component/shared/Input";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextLink from "../../component/shared/TextLink";
import { showToast } from "../../lib/nadish";
import { userLogin } from "../../api/login";
import { router } from "expo-router";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { HEADER_IMAGE } from "../../constants/images";
import { globalStyle } from "../../styles/globalStyle";
import { ScrollView } from "react-native-gesture-handler";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const { loginFunction } = useContext(userAuthContext);
  return (
    <View style={[globalStyle.container]}>
      {/* <HeadrImage /> */}
      <LoginForm
        mobile={mobile}
        setMobile={setMobile}
        password={password}
        setPassword={setPassword}
      />
      <Buttuns
        mobile={mobile}
        password={password}
        loginFunction={loginFunction}
      />
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          position: "absolute",
          bottom: 0,
        }}
      >
        <CreateAccount />
      </View>
    </View>
  );
}

const HeadrImage = () => {
  return (
    <View style={styles.imagecontainer}>
      <Image
        source={{
          uri: process.env.EXPO_PUBLIC_CLOUDINARY_ENDPOINT + HEADER_IMAGE,
        }}
        style={styles.headerImage}
      />
    </View>
  );
};

const LoginForm = ({ mobile, setMobile, password, setPassword }) => {
  const handleFogetPassword = () => {
    showToast("Forget Password");
  };
  return (
    <FormContainer
      title={"Login"}
      icon={<FontAwesome5 name="lock" size={24} color={colors.muteColor} />}
    >
      <Input
        label="Mobile"
        placeholder="Enter Mobile"
        text={mobile}
        setText={setMobile}
        validationMsg="Enter Register mobile"
        reqierd
        maxLength={10}
        keyboardType="numeric"
        icon={
          <FontAwesome5 name="mobile-alt" size={20} color={colors.muteColor} />
        }
      />
      <Input
        label="Password"
        placeholder="Enter Password"
        text={password}
        setText={setPassword}
        validationMsg="Enter Valid Name"
        reqierd
        icon={
          <MaterialCommunityIcons
            name="form-textbox-password"
            size={20}
            color={colors.muteColor}
          />
        }
      />
      <View style={styles.forgotPasswordView}>
        <Pressable
          style={styles.forgotPassword}
          onPress={() => {
            handleFogetPassword();
          }}
        >
          <Text style={{ color: colors.primary }}>Forget Password</Text>
        </Pressable>
      </View>
    </FormContainer>
  );
};

const Buttuns = ({ mobile, password, loginFunction }) => {
  const handleLogin = async () => {
    if (!mobile || !password) {
      showToast("Please Fill all the fields");
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
    };
    await loginFunction(userInformation);
    router.push("/(home)/home");
  };

  const handleAsGuest = () => {
    showToast("Login As Guest");
  };
  return (
    <View style={styles.loginViewButton}>
      <Pressable
        style={styles.loginButton}
        onPress={() => {
          handleLogin();
        }}
      >
        <Text style={{ color: colors.white }}>Login</Text>
      </Pressable>

      <Pressable
        style={styles.loginAsGuestButton}
        onPress={() => {
          handleAsGuest();
        }}
      >
        <Text style={{ color: colors.white }}>Continue As Guest</Text>
      </Pressable>
    </View>
  );
};

const CreateAccount = () => {
  return (
    <View style={styles.createAccountcontainer}>
      <Text style={{ color: colors.muteColor }}>I Do not have an account </Text>
      <TextLink href={"/(auth)/register"} title="Register" />
    </View>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: Dimensions.get("window").width,
    height: 316,
  },
  forgotPasswordView: {
    width: "100%",
  },
  forgotPassword: {
    alignItems: "flex-end",
  },
  scroll: {
    alignItems: "center",
    justifyContent: "center",
  },

  imagecontainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  lockIcon: {
    position: "absolute",
    bottom: -40,
    left: 10,
    zIndex: 1,
  },
  createAccountcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,

    marginBottom: 20,
  },
  loginViewButton: {
    width: "80%",
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
  loginAsGuestButton: {
    backgroundColor: colors.muteColor,
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

// {"Car": {"car": "", "carModel": "", "carYear": "", "createdAt": "2024-08-03T12:06:55.798Z", "id": "66ae1d603ab93e76014a4f79", "updatedAt": "2024-08-03T12:06:55.798Z", "userId": "66ae1d5f3ab93e76014a4f77"}, "PassRecoveryToken": "", "createdAt": "2024-08-03T12:06:55.798Z", "email": "Devnadish@gmail.com ", "id": "66ae1d5f3ab93e76014a4f77", "isVerified": false, "mobile": "0512345678", "name": "Nadeesh ", "password": "1234", "profile": {"avatar": "null", "city": "jeddah", "createdAt": "2024-08-03T12:06:55.798Z", "dist": "", "id": "66ae1d5f3ab93e76014a4f78", "updatedAt": "2024-08-03T12:06:55.798Z", "userId": "66ae1d5f3ab93e76014a4f77"}, "role": "user", "smsToken": "7279", "updatedAt": "2024-08-03T12:06:55.798Z"}
