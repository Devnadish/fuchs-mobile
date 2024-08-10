// UserAuthProvider.js
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    console.log("check login status");
    const userToken = await AsyncStorage.getItem("userToken");
    if (userToken) {
      setIsLogin(true);

      // Fetch and set user details
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const { name, email, mobile, avatar } = JSON.parse(userData);
        setUserName(name);
        setUserEmail(email);
        setUserMobile(mobile);
        setUserAvatar(avatar);
      }
    }
  };

  const login = async (userData) => {
    // Perform login logic (e.g., validate credentials)
    await AsyncStorage.setItem("userToken", "dummyToken");
    await AsyncStorage.setItem("userData", JSON.stringify(userData));

    const { name, email, avatar, mobile } = userData;
    setUserName(name);
    setUserEmail(email);
    setUserMobile(mobile);
    setUserAvatar(avatar);

    setIsLogin(true);

    console.log("Login successful");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userData");

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
        login,
        logout,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

// export { UserAuthProvider, userAuthContext };

// import React, { createContext, useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const userAuthContext = createContext(null);

// const UserAuthProvider = ({ children }) => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [userMobilee, setUserMobilee] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userAvatar, setUserAvatar] = useState("");

//   const fetchUserData = async () => {
//     try {
//       const user = await AsyncStorage.getItem("user");
//       if (user) {
//         const userData = JSON.parse(user);
//         setUserName(userData.name);
//         setUserEmail(userData.email);
//         setUserAvatar(userData.avatar);
//         setUserMobilee(userData.mobile);
//         setIsLogin(userData.isLogin);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const login = () => {
//     setIsLogin(true);
//   };
//   const logout = () => {
//     setIsLogin(false);
//   };

//   return (
//     <userAuthContext.Provider
//       value={{
//         isLogin,
//         setIsLogin,
//         userName,
//         setUserName,
//         userEmail,
//         setUserEmail,
//         userAvatar,
//         setUserAvatar,
//         userMobilee,
//         setUserMobilee,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </userAuthContext.Provider>
//   );
// };

// export { UserAuthProvider, userAuthContext };

// // import { createContext, useEffect, useState } from "react";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { getLocales } from "expo-localization";
// // import i18next, { languageResources } from "../../services/i18next";
// // import { I18nManager } from "react-native";

// // const userAuthContext = createContext(null);

// // const UserAuthProvider = ({ children }) => {
// //   const [isLogin, setIsLogin] = useState(false);
// //   const [userName, setuserName] = useState("");
// //   const [userMobilee, setUserMobilee] = useState("");
// //   const [userEmail, setuserEmail] = useState("");
// //   const [userAvatar, setuserAvatar] = useState("");
// //   const userInformation = CheckIsLogin();

// //    const CheckIsLogin = async () => {
// //      try {
// //        const user = await AsyncStorage.getItem("user");
// //      } catch (error) {
// //        console.error("Error fetching user data:", error);
// //      }
// //    };

// //   useEffect(() => {
// //     const userData = JSON.parse(userInformation);
// //     setuserName(userData.name);
// //     setuserEmail(userData.email);
// //     setuserAvatar(userData.avatar);
// //     setUserMobilee(userData.mobile);
// //     setIsLogin(userData.isLogin);
// //   }, [userInformation]);

// //   return (
// //     <userAuthContext.Provider
// //       value={{
// //         isLogin,
// //         setIsLogin,
// //         userName,
// //         setuserName,
// //         userEmail,
// //         setuserEmail,
// //         userAvatar,
// //         setuserAvatar,
// //         userMobilee,
// //         setUserMobilee,
// //       }}
// //     >
// //       {children}
// //     </userAuthContext.Provider>
// //   );
// // };

// // export { UserAuthProvider, userAuthContext };
