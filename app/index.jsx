import "react-native-gesture-handler";
import { Text, View } from "react-native";
import { colors, icons } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../components/shared/Input";
import Btn from "../components/shared/Btn";
import Seprator from "../components/shared/Seprator";
import { Image } from "expo-image";
export default function App() {
  return (
    <View
      style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    >
      {/* head image */}
      <LinearGradient
        colors={["#ffffff", colors.primary]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 0.8 }}
        // locations={[0.2, 0.6, 0.8]}
        style={{
          // position: "absolute",
          // top: 0,
          // left: 0,
          backgroundColor: colors.primary,
          width: "100%",
          height: "20%",
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/service/oneStop.png")}
          // placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
          style={{
            width: "100%",
            height: "100%",
            alignSelf: "center",
            aspectRatio: 1,
          }}
          // resizeMode="contain" // deprecated from expo-image
        />
      </LinearGradient>
      {/* login form */}
      <View
        style={{
          flexGrow: 1,
          width: "100%",
          // height: "70%",
          overflow: "hidden",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          flexGrow: 1,

          // backgroundColor: colors.primary,
        }}
      >
        {/* login Form And ForgetPassword  */}
        <InputForm />
        <LoginBtn />
        <Seprator />
        <AuthLogin />
        <RegisterBtn />
      </View>
    </View>

    // <Redirect href="/Booking" />
  );
}

// const styles = StyleSheet.create({subCont})

const InputForm = () => {
  return (
    <View
      style={{
        width: "100%",
        // height: "20%",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.gray,
      }}
    >
      <Input label="Email" placeholder="Enter Email" />
      <Input label="Password" placeholder="Enter Password" />
      <ForgetPassword />
    </View>
  );
};

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
