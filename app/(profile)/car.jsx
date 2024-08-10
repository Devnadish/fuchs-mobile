import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getUserByMobile } from "../../api/getUserByMobile";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { colors } from "../../constants";
import CarData from "../../component/profile/CarData";

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
    <>
      <ScrollView
        contentContainerStyle={styles.scroll}
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
            car={user?.Car?.car}
            carModel={user?.Car?.carModel}
            carYear={user?.Car?.carYear}
          />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
