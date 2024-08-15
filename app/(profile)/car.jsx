import { ActivityIndicator, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getUserByMobile } from "../../api/getUserByMobile";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { colors } from "../../constants";
import CarData from "../../component/profile/CarData";
import { globalStyle } from "../../styles/globalStyle";

export default function Car() {
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
    <ScrollView
      contentContainerStyle={globalStyle.scroll}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <ActivityIndicator
        animating={loading}
        color={colors.primary}
        size="large"
      />
      {!loading && user && (
        <CarData
          car={user?.car?.car}
          carModel={user?.car?.carModel}
          carYear={user?.car?.carYear}
        />
      )}
    </ScrollView>
  );
}
