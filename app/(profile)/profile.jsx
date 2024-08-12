import { ActivityIndicator, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { getUserByMobile } from "../../api/getUserByMobile";
import { colors } from "../../constants";
import ProfileData from "../../component/profile/ProfileData";
import { globalStyle } from "../../styles/globalStyle";

export default function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { userMobile } = useContext(userAuthContext);
  const queryData = { mobile: userMobile };

  const userData = async () => {
    setLoading(true);
    const data = await getUserByMobile(queryData);
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    userData();
  }, [userMobile]);

  if (!user) return null;

  return (
    <>
      <View style={globalStyle.container}>
        {loading && (
          <ActivityIndicator
            animating={loading}
            color={colors.primary}
            size="large"
          />
        )}
        {!loading && user && (
          <ProfileData
            name={user?.name}
            email={user?.email}
            mobile={user?.mobile}
            password={user?.password}
            city={user?.profile?.city}
            avatar={user?.profile?.avatar}
          />
        )}
      </View>
    </>
  );
}
