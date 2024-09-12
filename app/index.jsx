import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { useUserAuth } from "../provider/userAuth/userAuthProvider";

export default function Index() {
  const { isLogin, loading, userTheme } = useUserAuth(); // Access loading and isLogin
  const [initialLoading, setInitialLoading] = useState(true);
  // console.log({ userTheme });

  useEffect(() => {
    // Debug log to check loading state
    // console.log("Loading state:", loading);
    if (!loading) {
      setInitialLoading(false); // Set initial loading to false when loading is done
    }
  }, [loading]);

  if (initialLoading) {
    // console.log("Initial loading...");
    return null; // You can replace this with a loading spinner if desired
  }

  // console.log("isLogin state:", isLogin); // Debug log for isLogin

  if (isLogin) {
    return <Redirect href="/(home)/home" />;
  }

  return <Redirect href="/(auth)/home" />;
}
