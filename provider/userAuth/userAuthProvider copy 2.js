import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    isLogin: false,
    userName: "khalid test",
    userEmail: "",
    userMobile: "",
    userAvatar: "",
    userCar: "",
    userCarModel: "",
    userCarYear: "",
    userLanguage: "en",
    userTheme: "dark",
  });
  const [test, setTest] = useState("khalid");

  console.log(JSON.stringify(userData, null, 2));

  // Check login status and update state if user data exists
  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUserData = await AsyncStorage.getItem("userData");
      console.log("Stored User Data:", storedUserData); // Log the retrieved data
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        console.log("Parsed User Data:", parsedUserData); // Log the parsed data
        await setUserData((prevData) => ({
          ...prevData,
          ...parsedUserData,
          isLogin: true, // Set isLogin to true if user data is found
        }));
      }
    };

    checkLoginStatus(); // Call the function here
  }, []);

  const loginFunction = async (newUserData) => {
    console.log("Logging in with:", newUserData); // Log the new user data
    await AsyncStorage.setItem("userData", JSON.stringify(newUserData));
    setUserData({ ...newUserData, isLogin: true }); // Ensure isLogin is true
  };

  const contextValue = useMemo(
    () => ({
      ...userData,
      loginFunction,
      test,
      setTest,
    }),
    [userData, test] // Include test in the dependency array
  );

  return (
    <userAuthContext.Provider value={contextValue}>
      {children}
    </userAuthContext.Provider>
  );
};

// Custom hook for using the userAuthContext
export const useUserAuth = () => {
  const context = useContext(userAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};
