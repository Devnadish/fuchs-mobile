import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { useUserAuth } from "../provider/userAuth/userAuthProvider";
import * as Network from "expo-network";

export default function Index() {
  const { isLogin, loading } = useUserAuth(); // Access loading and isLogin
  const [isConnected, setIsConnected] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  // console.log({ isConnected });
  // Check network connection
  useEffect(() => {
    const checkNetwork = async () => {
      const { isConnected } = await Network.getNetworkStateAsync();
      setIsConnected(isConnected);
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
// import { useUserAuth } from "../provider/userAuth/userAuthProvider";
// import * as Network from "expo-network";

// export default function Index() {
//   const { isLogin, loading, userTheme } = useUserAuth(); // Access loading and isLogin
//   const [initialLoading, setInitialLoading] = useState(true);
//    const [isConnected, setIsConnected] = useState(null);
//   // console.log({ userTheme });

// useEffect(() => {
//   const checkNetwork = async () => {
//     const networkState = await Network.getNetworkStateAsync();
//     setIsConnected(networkState.isConnected);
//   };

//   checkNetwork();
// }, []);

//   useEffect(() => {
//     // Debug log to check loading state
//     // console.log("Loading state:", loading);
//     if (!loading) {
//       setInitialLoading(false); // Set initial loading to false when loading is done
//     }
//   }, [loading]);

//   if (initialLoading) {
//     // console.log("Initial loading...");
//     return null; // You can replace this with a loading spinner if desired
//   }

//   // console.log("isLogin state:", isLogin); // Debug log for isLogin

//   if (isLogin) {
//     return <Redirect href="/(home)/home" />;
//   }

//   return <Redirect href="/(auth)/home" />;
// }
