import React, { useState, useCallback } from "react";
import { View, Modal, Text } from "react-native";
import Btn from "../../shared/Btn";
import { showToast } from "../../../lib/nadish";
import Input from "../../shared/Input";

import TextLink from "../../shared/TextLink";
import * as logic from "./registerLogic";
import {
  createNewuser,
  ValidateBeforeCreate,
} from "../../../api/createNewuser";
import Otp from "./Otp";

const RegisteForm = () => {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [otpModalVisible, setOtpModalVisible] = useState(false);

  const handleRegister = useCallback(async () => {
    setLoading(true);
    const userData = { userName, mobile, password };
    const confirmation = await ValidateBeforeCreate(userData);
    if (confirmation.statusCode === 300) {
      // user exist
      showToast(confirmation.msg);
    }

    if (confirmation.statusCode === 301) {
      // user Not exist creeate Otp
      setOtpModalVisible(true); // Show OTP modal
    }
    setLoading(false);
    return;
  }, [userName, mobile, password]);

  return (
    <View style={logic.styles.form}>
      <View style={logic.styles.inputContainer}>
        <Input
          label="Name"
          placeholder="Enter Name"
          text={userName}
          setText={setUserName}
          validationMsg="Enter User Name"
          required
          maxLength={150}
          icon={logic.userIcon}
        />
        <Input
          label="Mobile"
          placeholder="Enter Mobile"
          text={mobile}
          setText={setMobile}
          validationMsg="Enter Register mobile"
          required
          maxLength={10}
          keyboardType="numeric"
          icon={logic.mobileIcon}
        />
        <Input
          label="Password"
          placeholder="Enter Password"
          text={password}
          setText={setPassword}
          validationMsg="Enter Valid Password"
          required
          icon={logic.passwordIcon}
        />
      </View>

      <Btn
        title="Register"
        handlePress={handleRegister}
        icon={logic.registerUserIcon}
        isLoading={loading}
        loadingText="Generating OTP..."
      />
      <TextLink href={"/(auth)/home"} title="Continue as Guest" />

      {/* OTP Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={otpModalVisible}
        onRequestClose={() => setOtpModalVisible(false)}
      >
        <Otp
          mobile={mobile}
          password={password}
          userName={userName}
          setOtpModalVisible={setOtpModalVisible}
        />
      </Modal>
    </View>
  );
};

export default React.memo(RegisteForm);
