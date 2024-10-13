import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Input from '@component/shared/Input';
import RNBtn from '@component/shared/RNBtn';
import useRegister from './useRegister';
import useIcon from '@hooks/useIcon';
import colors from '@constants/colors';
import { OtpInput } from 'react-native-otp-entry';
import ShowModal from '@component/shared/ShowModal';
import WhyIregister from '@component/auth/whyIregister/WhyIregister';

const RegisteForm = () => {
  const {
    loading,
    mobile,
    password,
    userName,
    setMobile,
    setPassword,
    setUserName,
    otpModalVisible,
    setOtpModalVisible,
    handleGuest,
    smsOtp,
    onFilledOtp,
    isCorrectOtp,
    handleOtpCode,
    handleRegister,
    registerLoading,
  } = useRegister();

  return (
    <View style={styles.form}>
      <View style={styles.whyIregister}>
        <Text style={styles.whyText}>Why should I register?</Text>
        <WhyIregister />
      </View>
      <View style={styles.inputContainer}>
        <Input
          label="Name"
          placeholder="Enter Name"
          text={userName}
          setText={setUserName}
          required
          maxLength={150}
          icon={useIcon('user', 24, colors.muteColor)}
        />
        <Input
          label="Mobile"
          placeholder="Enter Mobile"
          text={mobile}
          setText={setMobile}
          required
          maxLength={10}
          keyboardType="numeric"
          icon={useIcon('mobile', 24, colors.muteColor)}
        />
        <Input
          label="Password"
          placeholder="Enter Password"
          text={password}
          setText={setPassword}
          required
          maxLength={8}
          icon={useIcon('password', 24, colors.muteColor)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <RNBtn
          title="Continue"
          handlePress={handleOtpCode}
          isLoading={loading}
          loadingText="Generating OTP..."
        />
        <RNBtn
          title="Continue as Guest"
          handlePress={handleGuest}
          containerStyles={styles.guestBtn}
        />
      </View>

      <ShowModal
        visible={otpModalVisible}
        setVisible={setOtpModalVisible}
        header={`Hi, ${userName} - ${smsOtp}`}
        height={'40%'}>
        <Otp
          onFilledOtp={onFilledOtp}
          IsCorrectOtp={isCorrectOtp}
          handleRegister={handleRegister}
          registerLoading={registerLoading}
        />
      </ShowModal>
    </View>
  );
};

const Otp = ({ onFilledOtp, IsCorrectOtp, handleRegister, registerLoading }) => (
  <View style={styles.otpContainer}>
    <Text style={styles.resend}>Close to generate new OTP</Text>
    <View style={styles.modalContent}>
      <OtpInput
        numberOfDigits={4}
        focusColor={colors.primary}
        onFilled={onFilledOtp}
        theme={{
          containerStyle: styles.pinContainer,
          pinCodeContainerStyle: styles.pinCodeContainerStyle,
        }}
      />
      <Text style={{ color: IsCorrectOtp ? 'green' : 'red' }}>
        {IsCorrectOtp ? 'OTP is correct' : 'Enter correct OTP'}
      </Text>
      <RNBtn
        title="Register"
        icon={useIcon('UserPlus', 24, colors.white)}
        disabled={!IsCorrectOtp}
        handlePress={handleRegister}
        containerStyles={{ width: '40%', backgroundColor: colors.green }}
        isLoading={registerLoading} // Replace with actual loading state if needed
        loadingText="Registering..."
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  whyText: { fontSize: 12, color: colors.muteColor },
  whyIregister: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'flex-end',
  },
  resend: { fontSize: 12, color: colors.muteColor, position: 'absolute', top: 0, right: 0 },
  modalContent: { gap: 20, alignItems: 'center' },
  otpContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  pinContainer: {
    width: '70%',
    height: 50,
  },
  pinCodeContainerStyle: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  guestBtn: {
    backgroundColor: colors.muteColor,
  },
});

export default React.memo(RegisteForm);
