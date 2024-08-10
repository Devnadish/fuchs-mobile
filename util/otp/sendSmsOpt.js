export const otpSms = () => {
  // TODO: send otp
  const smsToken = Math.floor(1000 + Math.random() * 9000);
  return smsToken;
};
