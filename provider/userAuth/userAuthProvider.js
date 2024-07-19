import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Updates from "expo-updates";
import { getLocales } from "expo-localization";
import i18next, { languageResources } from "../../services/i18next";
import { I18nManager } from "react-native";

// FIXME: alert msg to tell use language effect to statrt on next render or lanching

const userAuthContext = createContext(null);

const UserAuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setuserName] = useState("khalid nadish");
  const [userEmail, setuserEmail] = useState("khalidnadish@gmail.com");
  const [userAvatar, setuserAvatar] = useState("avatar");

  //   useEffect(() => {
  //     const getUserDat= async () => {
  //       try {
  //       } catch (error) {
  //         console.error("user auth Error retrieving data:", error);
  //       }
  //     };

  //     getUserDat();
  //   }, []);

  return (
    <userAuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        userName,
        setuserName,
        userEmail,
        setuserEmail,
        userAvatar,
        setuserAvatar,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export { UserAuthProvider, userAuthContext };
