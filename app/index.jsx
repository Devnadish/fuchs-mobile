import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import * as Network from "expo-network";
import { Alert } from "react-native";

export default function Index() {
  const { isLogin, loading } = useUserAuth();
  const [isConnected, setIsConnected] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Check network connection
  useEffect(() => {
    const checkNetwork = async () => {
      const { isConnected } = await Network.getNetworkStateAsync();
      setIsConnected(isConnected);
      if (!isConnected) {
        Alert.alert("Network Error", "You are not connected to the internet.");
      }
    };

    checkNetwork();
  }, []);

  // Update initial loading state based on loading prop
  useEffect(() => {
    if (!loading) {
      setInitialLoading(false);
    }
  }, [loading]);

  // Show a loading state until the initial loading is complete
  if (initialLoading) {
    return null; // Consider adding a loading spinner here
  }

  // Redirect based on authentication status
  return <Redirect href={isLogin ? "/(home)/home" : "/(auth)/home"} />;
}

// import { Redirect } from "expo-router";
// import { useEffect, useState } from "react";
// import { useUserAuth } from "@provider/userAuth/userAuthProvider";
// import * as Network from "expo-network";

// export default function Index() {
//   const { isLogin, loading } = useUserAuth(); // Access loading and isLogin
//   const [isConnected, setIsConnected] = useState(null);
//   const [initialLoading, setInitialLoading] = useState(true);
//   // Check network connection
//   useEffect(() => {
//     const checkNetwork = async () => {
//       const { isConnected } = await Network.getNetworkStateAsync();
//       setIsConnected(isConnected);
//     };

//     checkNetwork();
//   }, []);

//   // Update initial loading state based on loading prop
//   useEffect(() => {
//     if (!loading) {
//       setInitialLoading(false);
//     }
//   }, [loading]);

//   // Show a loading state until the initial loading is complete
//   if (initialLoading) {
//     return null; // Consider adding a loading spinner here
//   }

//   // Redirect based on authentication status
//   return <Redirect href={isLogin ? "/(home)/home" : "/(auth)/home"} />;
// }
