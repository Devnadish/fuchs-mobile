import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import ScreenBarTitle from "@component/shared/ScreenBarTitle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@constants";
import BranchesPage from "@component/branches/compnent/BranchesPage";
import Container from "@component/shared/Containner";

export default function DisplayBranches() {
  const params = useLocalSearchParams();
  const { cityId, cityName } = params;
  return (
    <Container>
      <PageHeader cityName={"other city"} />
      <BranchesPage cityId={cityId} cityName={cityName} />
    </Container>
  );
}

const styles = StyleSheet.create({});
const PageHeader = ({ cityName }) => {
  return (
    <>
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
    </>
  );
};
