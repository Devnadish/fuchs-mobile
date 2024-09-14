import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { I18nManager } from "react-native";

export const userAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    userId: "",
    userName: "",
    userEmail: "",
    userMobile: "",
    userAvatar: "",
    userRole: "",

    userCity: "",
    userCityId: "",
    userLanguage: "en",
    userTheme: "light",

    userCar: "",
    userCarId: "",
    userModelId: "",
    userCarModel: "",
    userCarYear: "",

    isLogin: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedData = await AsyncStorage.getItem("userData");

      if (storedData) {
        setUserData({ ...JSON.parse(storedData), isLogin: true });
        console.log("userData In Context:", JSON.stringify(userData, null, 2));
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    i18next.changeLanguage(userData.userLanguage);
    I18nManager.forceRTL(userData.userLanguage === "ar");
  }, [userData.userLanguage]);

  const updateUserData = async (newData) => {
    await AsyncStorage.setItem("userData", JSON.stringify(newData));
    setUserData((prevData) => ({ ...prevData, ...newData, isLogin: true }));
    const storedData = await AsyncStorage.getItem("userData");
    console.log(
      "updated userData In Context:",
      JSON.stringify(storedData, null, 2)
    );
  };

  const loginFunction = async (userData) => {
    await updateUserData(userData);
  };

  const loadAsGuest = async () => {
    const guestData = {
      userId: "Guest",
      isLogin: false,
    };
    await updateUserData(guestData);
    console.log("Login As Guest successful");
  };

  const updateProfile = async (newProfileData) => {
    await updateUserData({ ...userData, ...newProfileData });
    console.log("Profile updated successfully");
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUserData({
      userId: "",
      userName: "",
      userEmail: "",
      userMobile: "",
      userAvatar: "",
      userRole: "",

      userCity: "",
      userCityId: "",
      userLanguage: "en",
      userTheme: "light",

      userCar: "",
      userCarId: "",
      userModelId: "",
      userCarModel: "",
      userCarYear: "",

      isLogin: false,
    });
    console.log("Logout successful");
  };

  const contextValue = useMemo(
    () => ({
      ...userData,
      loading,
      loginFunction,
      logout,
      loadAsGuest,
      updateProfile,
    }),
    [userData, loading]
  );

  return (
    <userAuthContext.Provider value={contextValue}>
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
