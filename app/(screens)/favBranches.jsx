import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants";
import { useUserAuth } from "../../provider/userAuth/userAuthProvider";
import { getBranchByCity } from "../../api/getBranchByCity";
import Container from "../../component/shared/Containner";
import { Stack, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import ScreenBarTitle from "../../component/shared/ScreenBarTitle";
import SkeletonBody from "../../component/shared/SkeltonBody";
import MapOnBranches from "../../component/branches/compnent/MapOnBranches";
import NoBranchs from "../../component/branches/compnent/NoBranchs";

const Limit = 6;

export default function FavorateBranchesPage({ userId }) {
  const params = useLocalSearchParams();
  const { howManyFav } = params;
  const { userLanguage, renderData } = useUserAuth();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const cityId = "favorite";

  const getBranches = async (page) => {
    setLoading(true);
    try {
      const { allBranches, totalPage } = await getBranchByCity(
        userLanguage,
        page,
        Limit,
        cityId,
        userId
      );

      setBranches(allBranches);
      setTotalPages(totalPage); // Set total pages based on API response

      // Adjust current page if it exceeds total pages
      if (currentPage > totalPage) {
        setCurrentPage(totalPage);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBranches(currentPage); // Fetch branches when the component mounts or when dependencies change
  }, [currentPage, renderData, userLanguage, userId]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Container>
      <PageHeader cityName={`Favorite ${howManyFav}`} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <SkeletonBody howMany={2} loading={loading} />
        ) : branches.length === 0 && currentPage > 1 ? (
          <SkeletonBody howMany={2} loading={true} /> // Show skeleton if removing last favorite and not on the first page
        ) : branches.length === 0 ? (
          <NoBranchs
            icon={
              <MaterialIcons name="favorite" size={124} color={colors.danger} />
            }
            title="No favorites found."
          />
        ) : (
          <MapOnBranches branches={branches} heartType="remove" />
        )}
      </ScrollView>
      {totalPages > 1 && ( // Only show pagination if there are more than 1 page
        <View style={styles.paginationContainer}>
          <Button
            title="Previous"
            onPress={handlePreviousPage}
            disabled={currentPage === 1}
          />
          <Text
            style={styles.pageIndicator}
          >{`Page ${currentPage} of ${totalPages}`}</Text>
          <Button
            title="Next"
            onPress={handleNextPage}
            disabled={currentPage === totalPages}
          />
        </View>
      )}
    </Container>
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
            <MaterialIcons name="favorite" size={24} color={colors.danger} />
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  pageIndicator: {
    alignSelf: "center",
    fontWeight: "bold",
  },
});
