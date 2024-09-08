import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../provider/userAuth/userAuthProvider";

export default function MainApp() {
  const { isLogin, checkLoginStatus } = useContext(userAuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyLoginStatus = async () => {
      await checkLoginStatus();
      setLoading(false);
    };

    verifyLoginStatus();
  }, [checkLoginStatus]);

  // Show a loading indicator or nothing while checking login status
  if (loading) {
    return null; // You can replace this with a loading spinner if desired
  }
  if (isLogin) {
    return <Redirect href="/(home)/home" />;
    // return <Redirect href={"/(auth)/home"} />;
    // return <Redirect href={"/(profile)/home"} />;
  }

  return <Redirect href={"/(auth)/home"} />;
}
