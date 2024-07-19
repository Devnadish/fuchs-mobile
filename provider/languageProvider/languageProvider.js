import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Updates from "expo-updates";
import { getLocales } from "expo-localization";
import i18next, { languageResources } from "../../services/i18next";
import { I18nManager } from "react-native";

// FIXME: alert msg to tell use language effect to statrt on next render or lanching

const LanguageContext = createContext(null);

const LanguageProvider = ({ children }) => {
  const deviceLanguage = getLocales()[0].languageCode;
  const [language, setLanguage] = useState("khalid");

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("lang");
        if (value !== null) {
          setLanguage(value);
        } else {
          setLanguage(deviceLanguage);
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    getData();
  }, []);

  // change language to arabic or english when user toggle the language
  useEffect(() => {
    language && changeLang(language);
  }, [language]);

  const changeLang = async (languageParam) => {
    i18next.changeLanguage(languageParam);
    language === "ar"
      ? I18nManager.forceRTL(true)
      : I18nManager.forceRTL(false);
    // Updates.reloadAsync();
    try {
      // await AsyncStorage.setItem("lang", language);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageProvider, LanguageContext };
