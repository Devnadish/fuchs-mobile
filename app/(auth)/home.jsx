import { StyleSheet, View, Dimensions } from "react-native";
import { colors } from "../../constants";
import { showToast } from "../../lib/nadish";
import Btn from "../../component/shared/Btn";
import Xlink from "../../component/shared/Xlink";
import WhyIregister from "../../component/auth/WhyIregister";
import { HeaderImage } from "../../component/auth/HeaderImage";
import Auth from "../../component/auth/Auth";

export default function HomePage() {
  return (
    <>
      <View style={styles.container}>
        {/* <StatusBar backgroundColor={colors.primary} barStyle={"dark-content"} /> */}
        {/* <HeaderImage /> */}
        <Auth />
        {/* <View style={styles.loginContainer}>
          <SignUp />
          <LoginAsGuest />
        </View>
        <BottomSingInComponent /> */}
      </View>
    </>
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
      <WhyIregister />
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
          borderWidth: 1,
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 40,
  },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
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
