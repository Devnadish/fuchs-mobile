import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { colors } from "../../constants";
import BottomSingInComponent from "../../component/auth/BottomSingInComponent";

// import SafeArea from "../components/shared/SafeArea";
import { StatusBar } from "expo-status-bar";
import { HEADER_IMAGE, LOGO_IMAGE } from "../../constants/images";
import { useContext } from "react";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { router } from "expo-router";
import Btn from "../../component/shared/Btn";
import Xlink from "../../component/shared/Xlink";

export default function HomePage() {
  const { userMobile, isLogin, userName } = useContext(userAuthContext);

  return (
    <>
      {/* {userMobile && <Redirect href="/(auth)/home" />} */}
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} barStyle={"dark-content"} />
        <View>
          <Image source={{ uri: HEADER_IMAGE }} style={styles.headerImage} />
          <Image source={{ uri: LOGO_IMAGE }} style={styles.logoImage} />
        </View>
        <View style={styles.loginContainer}>
          {isLogin ? <LoginAs userName={userName} /> : <SignUp />}
          <LoginAsGuest />
        </View>
        <BottomSingInComponent />
      </View>
    </>
  );
}

function LoginAs({ userName }) {
  return (
    <View>
      <Btn
        title={`Login as ${userName}`}
        containerStyles={{
          backgroundColor: colors.primary,
          borderColor: colors.muteColor,
        }}
        textStyles={{
          color: colors.backgroundColor,
        }}
        handlePress={() => {
          router.push("/(home)/home");
        }}
      />
    </View>
  );
}
const SignUp = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
        marginHorizontal: 20,
      }}
    >
      <Xlink href={"/(auth)/register"} title="Sign Up With Email" />
    </View>
  );
};
function LoginAsGuest() {
  return (
    <View>
      <Btn
        title="Continue as Guest"
        containerStyles={{
          backgroundColor: colors.backgroundColor,
          borderColor: colors.muteColor,
        }}
        textStyles={{
          color: colors.textColor,
        }}
        handlePress={() => {
          showToast("Continue as Guest");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    justifyContent: "space-between",
  },
  logoImage: {
    width: 120,
    height: 120,
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: 50 }], // center the image from bottom
  },
  headerImage: {
    width: Dimensions.get("window").width,
    height: 316,
  },
  body: {
    flex: 0.6,

    backgroundColor: colors.primary,
    height: "100%",
  },
  footer: {
    flex: 0.15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.danger,
  },
});