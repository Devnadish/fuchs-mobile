import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HeaderWithImage from "../../components/auth_screen/HeaderWithImage";
import { colors } from "../../constants";
import { Stack } from "expo-router";
import RegisterForm from "../../components/auth_screen/create_account/RegisterForm";
import { SafeAreaView } from "react-native-safe-area-context";
import OtpForm from "../../components/auth_screen/create_account/OtpForm";

export default function OtpScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* <Stack.Screen options={{ headerShown: false }} /> */}
        {/* header */}

        <View style={styles.header}>
          <HeaderWithImage back={true} />
        </View>

        {/* body */}
        <View style={styles.body}>
          <OtpForm />
        </View>
        {/* footer */}
        {/* <View style={styles.footer}></View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.25,
    backgroundColor: colors.backgroundColor,
  },
  body: {
    flex: 0.75,
    backgroundColor: colors.backgroundColor,
    height: "100%",
    justifyContent: "start",
    alignItems: "center",
  },
});
