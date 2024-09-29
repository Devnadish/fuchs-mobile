import React, { useState } from "react";
import { Text, View } from "react-native";
import * as logic from "./registerLogic";
import Btn from "@component/shared/Btn";
import { colors } from "@constants";
import { OtpInput } from "react-native-otp-entry";
import { showToast } from "@lib/nadish";
import { createNewuser } from "@api/createNewuser";
import { IMAGE_PLACE_HOLDER } from "@constants/images";

export default function Otp({
  mobile,
  password,
  userName,
  setOtpModalVisible,
}) {
  const [otp, setOtp] = useState("");
  const [SMSotp, setSMStOtp] = useState(logic.otpSms());
  const [loading, setLoading] = useState(false);

  const handleOtpSubmit = () => {
    // Handle OTP submission logic here
    setLoading(true);

    if (otp.toString() === SMSotp.toString()) {
      showToast("OTP Verified");
      const userData = {
        userName,
        mobile,
        password,
        isVerified: true,
        smsToken: SMSotp.toString(),
        avatar: IMAGE_PLACE_HOLDER,
      };
      const newUser = createNewuser(userData);
      if (newUser) {
        showToast("User created successfully");
        setOtpModalVisible(false);
      }
    } else {
      showToast("Invalid OTP");
    }
    setLoading(false);
  };

  const handleResendOtp = () => {
    // Handle resend OTP logic here
    setSMStOtp(logic.otpSms());
  };

  return (
    <View style={logic.styles.modalContainer}>
      <View style={logic.styles.modalContent}>
        <Text style={logic.styles.greetingText}>
          Hi, {userName} - {SMSotp}
        </Text>
        <Text style={logic.styles.modalTitle}>Enter OTP</Text>
        <View
          style={{
            width: "100%",
          }}
        >
          <OtpInput
            numberOfDigits={4}
            // onTextChange={(text) => handleOtpChange(text)}
            focusColor={colors.primary}
            focusStickBlinkingDuration={400}
            blurOnFilled
            autoFocus={false}
            onFilled={(text) => setOtp(text)}
            theme={{
              containerStyle: logic.styles.pinContainer,
              pinCodeContainerStyle: logic.styles.pinCodeContainerStyle,
            }}
          />
          <Btn
            handlePress={() => {
              handleResendOtp();
            }}
            title="Resend"
            containerStyles={{
              backgroundColor: "transparent",
              width: 80,
              alignSelf: "flex-end",
            }}
            textStyles={{
              color: colors.linkColor,
              textAlign: "right",
              width: "100%",
            }}
          />
        </View>
        <View style={logic.styles.modelOtpButtonContainer}>
          <Btn
            title="Submit"
            handlePress={handleOtpSubmit}
            containerStyles={{
              width: "40%",
              backgroundColor: colors.green,
            }}
            isLoading={loading}
            loadingText="Verifying OTP..."
          />
          <Btn
            title="Cancel"
            handlePress={() => setOtpModalVisible(false)}
            containerStyles={{
              width: "40%",
              backgroundColor: colors.danger,
            }}
          />
        </View>
      </View>
    </View>
  );
}
