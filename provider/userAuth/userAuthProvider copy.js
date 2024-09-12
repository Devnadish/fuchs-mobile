// UserAuthProvider.js
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

export const userAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userCar, setUserCar] = useState("");
  const [userCarModel, setUserCarModel] = useState("");
  const [userCarYear, setUserCarYear] = useState("");
  const [userLanguage, setUserLanguage] = useState("en");
  const [userTheme, setUserTheme] = useState("");

  useEffect(() => {
    checkLoginStatus();
    // I18nManager.forceRTL(false);
  }, []);

  const checkLoginStatus = async () => {
    console.log("check login status");
    const userData = await AsyncStorage.getItem("userData");
    console.log("userData from loacl storage: ", userData);
    if (userData) {
      const { name, email, mobile, avatar, isLogin } = JSON.parse(userData);
      setUserName(name);
      setUserEmail(email);
      setUserMobile(mobile);
      setUserAvatar(avatar);
      setIsLogin(isLogin);
    }
  };

  const loginFunction = async (userData) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    const { name, email, avatar, mobile, isLogin } = userData;
    console.log("user after login: ", userData);
    setUserName(name);
    setUserEmail(email);
    setUserMobile(mobile);
    setUserAvatar(avatar);
    setIsLogin(isLogin);
    console.log("Login successful");
    console.log("userAvatar from loacl storage: ", userAvatar);
  };

  const loadAsGuest = async () => {
    setUserName("Gust");
    setUserEmail("Gust");
    setUserMobile("Gust");
    setUserAvatar("Gust");
    setIsLogin(false);
    console.log("Login As Guest successful");
  };

  const updateProfile = async (userData) => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    const { name, email, avatar, mobile } = userData;
    setUserName(name);
    setUserEmail(email);
    setUserMobile(mobile);
    setUserAvatar(avatar);
    setIsLogin(true);
    console.log("update successful");
  };
  const updateImageProfile = async (newAvatar) => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        console.warn("No user data found.");
        return;
      }

      const userDataJson = JSON.parse(userData);
      userDataJson.avatar = newAvatar;

      await AsyncStorage.setItem("userData", JSON.stringify(userDataJson));

      // Update state with new user data
      const { name, email, mobile } = userDataJson;
      setUserName(name);
      setUserEmail(email);
      setUserMobile(mobile);
      setUserAvatar(newAvatar); // Update avatar state
      setIsLogin(true);

      console.log("Profile image updated successfully:", userDataJson);
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  const updateUserProfile = async (newName, newEmail) => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        console.warn("No user data found.");
        return;
      }

      const userDataJson = JSON.parse(userData);
      userDataJson.name = newName;
      userDataJson.email = newEmail;

      await AsyncStorage.setItem("userData", JSON.stringify(userDataJson));

      // Update state with new user data
      const { name, email, mobile, avatar } = userDataJson;
      setUserName(name);
      setUserEmail(email);
      setUserMobile(mobile);
      setUserAvatar(avatar); // Update avatar state
      setIsLogin(true);

      console.log("Profile image updated successfully:", userDataJson);
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUserName("");
    setUserEmail("");
    setUserAvatar("");
    setUserMobile("");
    setIsLogin(false);
    console.log("Logout successful");
  };

  return (
    <userAuthContext.Provider
      value={{
        isLogin,
        userName,
        userEmail,
        userAvatar,
        userMobile,
        setUserMobile,
        loginFunction,
        logout,
        updateProfile,
        userCar,
        setUserCar,
        userCarModel,
        setUserCarModel,
        userCarYear,
        setUserCarYear,
        userLanguage,
        setUserLanguage,
        userTheme,
        setUserTheme,
        loadAsGuest,
        checkLoginStatus,
        updateImageProfile,
        updateUserProfile,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(userAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};
