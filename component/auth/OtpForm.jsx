import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants";
import { showToast } from "../../lib/nadish";
import { OtpInput } from "react-native-otp-entry";

export default function OtpForm({ enterOtp, setEnterOtp }) {
  // const handleOtpChange = (text) => {
  //   setEnterOtp((prev) => [...prev, text]);
  // };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 20,
      }}
    >
      <Text>Enter Otp From SMS To complete your registration</Text>

      <OtpInput
        numberOfDigits={4}
        // onTextChange={(text) => handleOtpChange(text)}
        focusColor={colors.primary}
        focusStickBlinkingDuration={400}
        blurOnFilled
        autoFocus={false}
        onFilled={(text) => setEnterOtp(text)}
        theme={{
          containerStyle: styles.pinContainer,
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
      <Pressable
        onPress={() => {
          showToast("Resend");
        }}
        style={{ alignSelf: "flex-end", marginHorizontal: 30 }}
      >
        <Text style={{ color: colors.linkColor, fontWeight: "bold" }}>
          Resend OTP
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pinContainer: {
    backgroundColor: colors.backgroundColor,
    width: "80%",
    height: 58,
  },
});
