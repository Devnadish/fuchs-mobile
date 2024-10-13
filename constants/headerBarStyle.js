// import React from 'react';
import WhyIregister from '@component/auth/whyIregister/WhyIregister';

import colors from './colors';

export const indexBarStyle = {
  title: 'Welcome',
  headerShown: true,
  headerTitleAlign: 'center',
  headerTintColor: colors.linkColor,
  headerRight: () => <WhyIregister />,
};
export const carBarStyle = {
  title: 'Cars',
  headerShown: true,
  headerTitleAlign: 'center',
  headerTintColor: colors.danger,
};
export const createNewUser = {
  title: 'Create Account',
  headerShown: true,
  headerTitleAlign: 'center',
  headerTintColor: colors.linkColor,
  // headerRight: () => <WhyIregister />,
};
export const otpScreen = {
  title: 'OTP Verification',
  headerShown: true,
  headerTitleAlign: 'center',
  headerTintColor: colors.linkColor,
  // headerRight: () => <WhyIregister />,
};
export const loginScreen = {
  title: 'Login',
  headerShown: true,
  headerTitleAlign: 'center',
  headerTintColor: colors.linkColor,
  // headerBackVisible: false,
  // headerRight: () => <WhyIregister />,
};

export const StackScreenOption = (options = {
  headerShown: true,
  headerStyle: { backgroundColor: colors.white, fontSize: 12 },
  headerTintColor: colors.primary,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
