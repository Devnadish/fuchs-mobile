import { useState, useCallback } from 'react';
import { showToast } from '@lib/nadish';
import { createNewuser, ValidateBeforeCreate } from '@api/createNewuser';
import { router } from 'expo-router';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import { otpSms } from '@util/otp/sendSmsOpt';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [isCorrectOtp, setIsCorrectOtp] = useState(false);
  const smsOtp = otpSms();

  const { loginAsGuest } = useUserAuth();

  const handleOtpCode = useCallback(async () => {
    setLoading(true);
    const userData = { userName, mobile, password };
    const confirmation = await ValidateBeforeCreate(userData);

    if (confirmation.statusCode === 300) {
      showToast(confirmation.msg);
    } else if (confirmation.statusCode === 301) {
      setOtpModalVisible(true);
    }

    setLoading(false);
  }, [userName, mobile, password]);

  const handleGuest = useCallback(async () => {
    setLoading(true);
    await loginAsGuest();
    router.push({ pathname: '/(home)/homeTab' });
    setLoading(false);
  }, [loginAsGuest]);

  const onFilledOtp = text => {
    setIsCorrectOtp(text.toString() === smsOtp.toString());
  };

  const handleRegister = async () => {
    setRegisterLoading(true);
    const userData = {
      userName,
      mobile,
      password,
      isVerified: true,
      smsToken: smsOtp.toString(),
    };
    const newUser = await createNewuser(userData);
    if (newUser) {
      showToast('User created successfully');
      setOtpModalVisible(false);
    }
    setRegisterLoading(false);
  };

  return {
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
    handleRegister,
    onFilledOtp,
    isCorrectOtp,
    handleOtpCode,
    registerLoading,
  };
};

export default useRegister;
