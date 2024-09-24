import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import RadioButton from "../../component/shared/RadioButton";
import { colors } from "../../constants";
import { useTheme } from "../../provider/themeProvider/useThemProvider";
import { MaterialIcons } from "@expo/vector-icons";
import SaveAndCancel from "../../component/shared/SaveAndCancel";
import { showToast } from "../../lib/nadish";
import { useUserAuth } from "../../provider/userAuth/userAuthProvider";
import { UPDATE_USER_SETTING } from "../../api/updateUserProfile";
import { router, Stack } from "expo-router";
import ScreenBarTitle from "../../component/shared/ScreenBarTitle";
import Container from "../../component/shared/Containner";
import * as Updates from "expo-updates";

const options = {
  language: [
    { label: "عربي", value: "ar" },
    { label: "English", value: "en" },
  ],
  theme: [
    {
      label: "Light",
      value: "light",
      icon: (
        <MaterialIcons
          name={"light-mode"}
          size={24}
          color={colors.primaryForeground}
        />
      ),
    },
    {
      label: "Dark",
      value: "dark",
      icon: (
        <MaterialIcons
          name={"dark-mode"}
          size={24}
          color={colors.primaryForeground}
        />
      ),
    },
  ],
};

export default function Setting() {
  const { userLanguage, userTheme, updateProfile, userMobile } = useUserAuth();
  const [language, setLanguage] = useState(userLanguage);
  const [theme, setTheme] = useState(userTheme);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleSubmit = async () => {
    setUpdateLoading(true);
    try {
      const userInformation = {
        mobile: userMobile,
        language: language,
        theme: theme,
      };
      const updateData = await UPDATE_USER_SETTING(userInformation);
      if (updateData) {
        await updateProfile({ userLanguage: language, userTheme: theme });
        showToast("Setting updated successfully");
        promptRestart();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const promptRestart = () => {
    Alert.alert(
      "Settings Updated",
      "Your settings have been updated. Would you like to restart the app now to apply the changes?",
      [
        {
          text: "Later",
          onPress: () => router.back(),
          style: "cancel",
        },
        {
          text: "Restart Now",
          onPress: async () => {
            await Updates.reloadAsync();
            showToast("App will restart to apply changes."); // Placeholder for actual restart logic
            router.back(); // Navigate back after the alert
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerBackTitleVisible: true,
            headerTitle: () => <ScreenBarTitle title={"Setting"} />,
            headerShadowVisible: true,
            headerStyle: { backgroundColor: colors.backgroundColor },
            headerTintColor: colors.primaryBtn,
            headerTitleAlign: "center",
          }}
        />
        <SettingOption
          title="Language"
          options={options.language}
          selectedValue={language}
          onSelect={setLanguage}
        />
        <SettingOption
          title="Theme"
          options={options.theme}
          selectedValue={theme}
          onSelect={setTheme}
        />
        <SaveAndCancel handleSubmit={handleSubmit} indicator={updateLoading} />
      </View>
    </Container>
  );
}

const SettingOption = ({ title, options, selectedValue, onSelect }) => {
  return (
    <View>
      <Text>{title}</Text>
      <View style={styles.optionsContainer}>
        <RadioButton
          options={options}
          selectedValue={selectedValue}
          onValueChange={onSelect}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.backgroundColor,
    gap: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.white,
  },
});

// styleing stratigy

// import React, { useMemo } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { useTheme } from './themeContext';

// const YourComponent = () => {
//   const { theme, toggleTheme } = useTheme();

//   // Memoize styles based on the current theme
//   const currentStyles = useMemo(() => ({
//     container: {
//       backgroundColor: theme.background,
//       padding: 20,
//       borderRadius: 10,
//     },
//     text: {
//       color: theme.foreground,
//     },
//     button: {
//       backgroundColor: theme.primary,
//       color: theme.foreground,
//     },
//   }), [theme]); // Recalculate only when the theme changes

//   return (
//     <View style={[styles.container, currentStyles.container]}>
//       <Text style={[styles.text, currentStyles.text]}>Hello, World!</Text>
//       <Button
//         title="Toggle Theme"
//         onPress={toggleTheme}
//         color={theme.accent} // Use theme color for button
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//   },
// });

// export default YourComponent;

// App.js  how to change lange layout
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { View, Text, Button, StyleSheet, I18nManager } from 'react-native';
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // Initialize i18next
// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: {
//         translation: {
//           welcome: "Welcome",
//           toggleLanguage: "Switch to Arabic",
//         },
//       },
//       ar: {
//         translation: {
//           welcome: "أهلا وسهلا",
//           toggleLanguage: "التبديل إلى الإنجليزية",
//         },
//       },
//     },
//     lng: "en",
//     fallbackLng: "en",
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// // Create Language Context
// const LanguageContext = createContext();

// const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState('en');

//   useEffect(() => {
//     i18n.changeLanguage(language);
//     I18nManager.forceRTL(language === 'ar');
//   }, [language]);

//   const changeLanguage = (lng) => {
//     setLanguage(lng);
//   };

//   return (
//     <LanguageContext.Provider value={{ language, changeLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// const YourComponent = () => {
//   const { language, changeLanguage } = useContext(LanguageContext);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>
//         {i18n.t('welcome')}
//       </Text>
//       <Button
//         title={i18n.t('toggleLanguage')}
//         onPress={() => changeLanguage(language === 'en' ? 'ar' : 'en')}
//       />
//     </View>
//   );
// };

// const App = () => {
//   return (
//     <LanguageProvider>
//       <YourComponent />
//     </LanguageProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   text: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });

// export default App;
