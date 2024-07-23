import { Dimensions, View, Text } from "react-native";
import React from "react";
import { colors } from "../../../constants";
import Btn from "../../shared/Btn";
import { showToast } from "../../../lib/nadish";
import { OtpInput } from "react-native-otp-entry";

export default function OtpForm() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Text>Enter Otp From SMS To complete your registration</Text>
      <View
        style={{
          marginVertical: 22,
          width: Dimensions.get("screen").width * 0.8,
          gap: 25,
        }}
      >
        <OtpInput
          numberOfDigits={4}
          onTextChange={(text) => console.log(text)}
          focusColor={colors.primary}
          focusStickBlinkingDuration={400}
          theme={{
            pinCodeContainerStyle: {
              backgroundColor: colors.backgroundColor,
              width: 58,
              height: 58,
              borderWidth: 1,
              borderColor: colors.borderColor,
              borderRadius: 12,
            },
          }}
        />
      </View>
      <Btn
        type="link"
        title="Resend Otp"
        containerStyles={{
          alignSelf: "flex-end",
          marginRight: 15,
          marginBottom: 10,
        }}
        handlePress={() => {
          showToast("Resend");
        }}
      />

      <Btn
        title="Register"
        handlePress={() => {
          showToast("Continue as Guest");
        }}
      />
    </View>
  );
}
