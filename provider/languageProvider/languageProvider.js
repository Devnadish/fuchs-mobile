import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18next from "../../services/i18next";
import { I18nManager, Alert } from "react-native";

const LanguageContext = createContext(null);

const LanguageProvider = ({ children }) => {
  const deviceLanguage = getLocales()[0].languageCode;
  const [language, setLanguage] = useState(deviceLanguage);

  useEffect(() => {
    const fetchStoredLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("lang");
        if (storedLanguage) {
          setLanguage(storedLanguage);
        }
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to retrieve language preference: " + error.message
        );
      }
    };

    fetchStoredLanguage();
  }, []);

  useEffect(() => {
    if (language) {
      changeLang(language);
    }
  }, [language]);

  const changeLang = async (languageParam) => {
    try {
      await i18next.changeLanguage(languageParam);
      const isArabic = languageParam === "ar";
      I18nManager.forceRTL(isArabic);

      // Optionally reload the app to apply changes
      // Updates.reloadAsync(); // Uncomment if using Expo Updates

      await AsyncStorage.setItem("lang", languageParam);
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while changing the language: " + error.message
      );
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageProvider, LanguageContext };
