import { StyleSheet, Text, View, Dimensions } from "react-native";
import { colors, icons } from "../constants";
import Btn from "../components/shared/Btn";
import HeaderWithImage from "../components/auth_screen/HeaderWithImage";

import BottomSingInComponent from "../components/auth_screen/sign_up/BottomSingInComponent";
import SignUpComponent from "../components/auth_screen/sign_up/SignUpComponent";

import SafeArea from "../components/shared/SafeArea";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <SafeArea>
      <StatusBar backgroundColor={colors.primary} barStyle={"dark-content"} />
      <View
        style={{
          flex: 1,
        }}
      >
        {/* header */}

        <View style={styles.header}>
          <HeaderWithImage />
        </View>
        {/* body */}
        <View style={styles.body}>
          <SignUpComponent />
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <BottomSingInComponent />
        </View>
      </View>
    </SafeArea>
  );
}

const ForgetPassword = () => {
  return (
    <View
      style={{
        width: "100%",
        overflow: "hidden",
        alignItems: "flex-end",
        paddingRight: 15,
      }}
    >
      <Btn title="Forget Password?" type="link" />
    </View>
  );
};
const LoginBtn = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 150,
        overflow: "hidden",
        alignItems: "center",
        paddingRight: 15,
      }}
    >
      <Btn
        title="Sing in"
        containerStyles={{
          width: "80%",
          backgroundColor: colors.linkColor,
          height: 55,
          borderRadius: 25,
        }}
        textStyles={{
          color: colors.white,
          fontSize: 20,
          fontWeight: "Semibold",
        }}
      />
    </View>
  );
};

const AuthLogin = () => {
  return (
    <View style={{ width: "100%", height: 200, backgroundColor: colors.gray }}>
      <Text
        style={{
          alignSelf: "flex-start",
          paddingLeft: 15,
          color: "gray",
          marginBottom: 10,
        }}
      >
        Or Login with
      </Text>
      <View
        style={{
          width: "100%",
          overflow: "hidden",
          alignItems: "center",
          paddingRight: 15,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Btn
          // title="Sing in"
          icon={icons.google}
          containerStyles={{
            width: 60,
            backgroundColor: colors.white,
            borderColor: colors.gray,
            height: 60,
            borderRadius: 50,
          }}
          textStyles={{
            color: colors.white,
            fontSize: 20,
            fontWeight: "Semibold",
          }}
        />
        <Btn
          // title="Sing in"
          icon={icons.apple}
          containerStyles={{
            width: 60,
            backgroundColor: colors.white,
            borderColor: colors.gray,
            height: 60,
            borderRadius: 50,
          }}
        />
      </View>
    </View>
  );
};

const RegisterBtn = () => {
  return (
    <View
      style={{
        width: "100%",
        overflow: "hidden",
        alignItems: "center",
        paddingRight: 15,
        flexDirection: "row",
        justifyContent: "flex-end",
        // flexGrow: 1,
      }}
    >
      <Text>Don't have an account?</Text>
      <Btn title="Sing Up" type="link" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.25,
    backgroundColor: colors.backgroundColor,
  },
  body: {
    flex: 0.6,

    backgroundColor: colors.backgroundColor,
    height: "100%",
  },
  footer: {
    flex: 0.15,
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // flex: 1,
    width: "100%",
    height: "auto",
    backgroundColor: "black",
  },
});
