import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import * as logic from './registerStyle';
import { colors } from '@constants';
import { OtpInput } from 'react-native-otp-entry';
import RNBtn from '@component/shared/RNBtn';
import { useOtp } from './useOtp'; // Import the custom hook

export default function Otp({ mobile, password, userName, setOtpModalVisible }) {
  const { otp, setOtp, SMSotp, loading, handleOtpSubmit, handleResendOtp } = useOtp(
    mobile,
    password,
    userName,
    setOtpModalVisible
  );

  const handleSubmit = () => {};

  const handleOtp = () => {};

  return (
    <View style={logic.styles.modalContainer}>
      <View style={logic.styles.modalContent}>
        <Text style={logic.styles.greetingText}>
          Hi, {userName} - {SMSotp}
        </Text>
        <Text style={logic.styles.modalTitle}>Enter OTP</Text>
        <View style={{ width: '100%' }}>
          <OtpInput
            numberOfDigits={4}
            focusColor={colors.primary}
            focusStickBlinkingDuration={400}
            blurOnFilled
            autoFocus={false}
            onFilled={handleOtp}
            // onFilled={text => setOtp(text)}
            theme={{
              containerStyle: logic.styles.pinContainer,
              pinCodeContainerStyle: logic.styles.pinCodeContainerStyle,
            }}
            onCodeFilled={handleSubmit}
          />
          <RNBtn
            handlePress={handleResendOtp}
            title="Resend"
            containerStyles={{
              backgroundColor: 'transparent',
              width: 80,
              alignSelf: 'flex-end',
            }}
            textStyles={{
              color: colors.linkColor,
              textAlign: 'right',
              width: '100%',
            }}
          />
        </View>
        <View style={logic.styles.modelOtpButtonContainer}>
          <RNBtn
            title="Submit"
            handlePress={handleOtpSubmit}
            containerStyles={{
              width: '40%',
              backgroundColor: colors.green,
            }}
            isLoading={loading}
            loadingText="Verifying OTP..."
          />
          <RNBtn
            title="Cancel"
            handlePress={() => setOtpModalVisible(false)}
            containerStyles={{
              width: '40%',
              backgroundColor: colors.danger,
            }}
          />
        </View>
      </View>
    </View>
  );
}

// Define prop types for Otp
Otp.propTypes = {
  mobile: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  setOtpModalVisible: PropTypes.func.isRequired,
};
