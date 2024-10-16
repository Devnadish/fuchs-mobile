import 'react-native-gesture-handler';
// import React from 'react';
import { Stack } from 'expo-router';
import { LanguageProvider } from '@provider/languageProvider/languageProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { indexBarStyle } from '@constants/headerBarStyle';
import { pingServer, showToast } from '@lib/nadish';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from '@provider/themeProvider/useThemProvider';
import { UserAuthProvider } from '@provider/userAuth/userAuthProvider';

const RootLayout = () => {
  const isServerReachable = pingServer(); // Store the result in a variable

  if (isServerReachable) {
    showToast('Server is reachable and responsive');
  } else {
    showToast('Server is not reachable or unresponsive');
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Ensure this wraps everything */}
      <UserAuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Stack>
              <Stack.Screen name="index" options={indexBarStyle} />
              {/* <Stack.Screen name="selectcar" options={carBarStyle} /> */}
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
              <Stack.Screen name="(profile)" options={{ headerShown: false }} />
              <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            </Stack>
          </LanguageProvider>
        </ThemeProvider>
        <Toast position="top" topOffset={50} visibilityTime={2000} />
      </UserAuthProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
