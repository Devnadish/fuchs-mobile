import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { I18nManager } from "react-native";

export const userAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const initialUserData = {
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
  };

  const [userData, setUserData] = useState(initialUserData);
  const [loading, setLoading] = useState(true);
  const [renderData, setRenderData] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData({ ...parsedData, isLogin: true });
      }
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const { userLanguage } = userData;
    if (!userLanguage) return;
    i18next.changeLanguage(userLanguage);
    I18nManager.forceRTL(userLanguage === "ar");
  }, [userData.userLanguage]);

  const updateUserData = useCallback(
    async (newData) => {
      const updatedData = { ...userData, ...newData, isLogin: true };
      await AsyncStorage.setItem("userData", JSON.stringify(updatedData));
      setUserData(updatedData);
    },
    [userData]
  );

  const loginFunction = useCallback(
    async (userData) => {
      await updateUserData(userData);
    },
    [updateUserData]
  );

  const loadAsGuest = useCallback(async () => {
    const guestData = { userId: "Guest", isLogin: false };
    await updateUserData(guestData);
  }, [updateUserData]);

  const updateProfile = useCallback(
    async (newProfileData) => {
      await updateUserData(newProfileData);
    },
    [updateUserData]
  );

  const logout = useCallback(async () => {
    await AsyncStorage.clear();
    setUserData(initialUserData);
  }, []);

  const contextValue = useMemo(
    () => ({
      ...userData,
      loading,
      loginFunction,
      logout,
      loadAsGuest,
      updateProfile,
      renderData,
      setRenderData,
    }),
    [
      userData,
      loading,
      loginFunction,
      logout,
      loadAsGuest,
      updateProfile,
      renderData,
    ]
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

// import React, {
//   createContext,
//   useEffect,
//   useState,
//   useMemo,
//   useContext,
// } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import i18next from "i18next";
// import { I18nManager } from "react-native";

// export const userAuthContext = createContext(null);

// export const UserAuthProvider = ({ children }) => {
//   const initialUserData = {
//     userId: "",
//     userName: "",
//     userEmail: "",
//     userMobile: "",
//     userAvatar: "",
//     userRole: "",
//     userCity: "",
//     userCityId: "",
//     userLanguage: "en",
//     userTheme: "light",
//     userCar: "",
//     userCarId: "",
//     userModelId: "",
//     userCarModel: "",
//     userCarYear: "",
//     isLogin: false,
//   };

//   const [userData, setUserData] = useState(initialUserData);
//   const [loading, setLoading] = useState(true);
//   const [renderData, setRenderData] = useState(null); // refeche data if need
//   console.log("from Provider :", { renderData });

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const storedData = await AsyncStorage.getItem("userData");
//       if (storedData) {
//         const parsedData = JSON.parse(storedData);
//         setUserData({ ...parsedData, isLogin: true });
//         // console.log(
//         //   "User Data In Context:",
//         //   JSON.stringify(parsedData, null, 2)
//         // );
//       }
//       setLoading(false);
//     };
//     checkLoginStatus();
//   }, []);

//   useEffect(() => {
//     const { userLanguage } = userData;
//     if (!userLanguage) return;
//     // console.log("Language:", userLanguage);
//     i18next.changeLanguage(userLanguage);
//     I18nManager.forceRTL(userLanguage === "ar");
//     // Reload the app when the language changes
//   }, [userData.userLanguage]);

//   const updateUserData = async (newData) => {
//     const updatedData = { ...userData, ...newData, isLogin: true };
//     await AsyncStorage.setItem("userData", JSON.stringify(updatedData));
//     setUserData(updatedData);
//     // console.log(
//     //   "Updated User Data In Context:",
//     //   JSON.stringify(updatedData, null, 2)
//     // );
//   };

//   const loginFunction = async (userData) => {
//     await updateUserData(userData);
//   };

//   const loadAsGuest = async () => {
//     const guestData = { userId: "Guest", isLogin: false };
//     await updateUserData(guestData);
//     console.log("Login As Guest successful");
//   };

//   const updateProfile = async (newProfileData) => {
//     await updateUserData(newProfileData);
//     console.log("Profile updated successfully");
//   };

//   const logout = async () => {
//     await AsyncStorage.clear();
//     setUserData(initialUserData);
//     console.log("Logout successful");
//   };

//   const contextValue = useMemo(
//     () => ({
//       ...userData,
//       loading,
//       loginFunction,
//       logout,
//       loadAsGuest,
//       updateProfile,
//       renderData,
//       setRenderData,
//     }),
//     [userData, loading]
//   );

//   return (
//     <userAuthContext.Provider value={contextValue}>
//       {children}
//     </userAuthContext.Provider>
//   );
// };

// export const useUserAuth = () => {
//   const context = useContext(userAuthContext);
//   if (!context) {
//     throw new Error("useUserAuth must be used within a UserAuthProvider");
//   }
//   return context;
// };
