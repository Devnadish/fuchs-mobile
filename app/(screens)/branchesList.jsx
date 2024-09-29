import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { groupBranchesByCity } from "@api/groupBranchesByCity";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import { colors } from "@constants";
import { ScrollView } from "moti";
import RenderBranchesList from "@component/branches/compnent/RenderBranchesList";
import { Stack } from "expo-router";
import ScreenBarTitle from "@component/shared/ScreenBarTitle";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import SkeletonBody from "@component/shared/SkeltonBody";
import NoBranchs from "@component/branches/compnent/NoBranchs";

export default function BranchesList() {
  const { userLanguage } = useUserAuth();
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);

  const fetchCities = useCallback(async () => {
    setLoading(true);
    try {
      const cityData = await groupBranchesByCity(userLanguage);
      const sortedCities = cityData.groupedData.sort((a, b) => {
        const nameA = userLanguage === "ar" ? a.cityAr : a.cityEn;
        const nameB = userLanguage === "ar" ? b.cityAr : b.cityEn;
        return nameA.localeCompare(nameB);
      });
      setCities(sortedCities);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    } finally {
      setLoading(false);
    }
  }, [userLanguage]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <>
      <PageHeader cityName="More Branches" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <SkeletonBody howMany={12} loading={loading} height={40} />
        ) : cities.length === 0 ? (
          <NoBranchs
            icon={<Entypo name="emoji-sad" size={124} color={colors.primary} />}
            title={"No Branches Found"}
          />
        ) : (
          <RenderBranchesList cities={cities} userLanguage={userLanguage} />
        )}
      </ScrollView>
    </>
  );
}

const PageHeader = ({ cityName }) => (
  <Stack.Screen
    options={{
      headerShown: true,
      headerBackTitleVisible: true,
      headerTitle: () => (
        <ScreenBarTitle
          title={cityName}
          icon={
            <MaterialCommunityIcons
              name="home-city"
              size={24}
              color={colors.primary}
            />
          }
        />
      ),
      headerShadowVisible: true,
      headerStyle: { backgroundColor: colors.backgroundColor },
      headerTintColor: colors.primaryBtn,
      headerTitleAlign: "center",
    }}
  />
);

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    backgroundColor: colors.backgroundColor,
  },
});
