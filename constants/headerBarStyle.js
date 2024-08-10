import WhyIregister from "../component/auth/WhyIregister";
import ActiveBooking from "../component/home/ActiveBookin";
import UserAvatar from "../component/home/UserAvatar";
import colors from "./colors";

export const indexBarStyle = {
  title: "Sign Up",
  headerShown: true,
  headerTitleAlign: "center",
  headerTintColor: colors.linkColor,
  headerRight: () => <WhyIregister />,
};
export const createNewUser = {
  title: "Create Account",
  headerShown: true,
  headerTitleAlign: "center",
  headerTintColor: colors.linkColor,
  // headerRight: () => <WhyIregister />,
};
export const otpScreen = {
  title: "OTP Verification",
  headerShown: true,
  headerTitleAlign: "center",
  headerTintColor: colors.linkColor,
  // headerRight: () => <WhyIregister />,
};
export const loginScreen = {
  title: "Login",
  headerShown: true,
  headerTitleAlign: "center",
  headerTintColor: colors.linkColor,
  // headerBackVisible: false,
  // headerRight: () => <WhyIregister />,
};
