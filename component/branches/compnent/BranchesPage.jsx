import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@constants";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import Container from "@component/shared/Containner";
import SkeletonBody from "@component/shared/SkeltonBody";
import MapOnBranches from "./MapOnBranches";
import NoBranchs from "./NoBranchs";
import Pagination from "@component/shared/Pagination";
import useBranchesPage from "@hooks/useBranchesPage";

const BranchesPage = ({ cityId, cityName }) => {
  const { userLanguage, renderData, userId } = useUserAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null); // State to handle errors

  const { branches, loading, totalPages } = useBranchesPage(
    cityId,
    userLanguage,
    userId,
    currentPage,
    renderData
  );

  // Effect to handle errors from the hook
  useEffect(() => {
    if (branches === null) {
      setError("Failed to load branches. Please try again later.");
    } else {
      setError(null); // Reset error if branches load successfully
    }
  }, [branches]);

  const renderContent = () => {
    if (loading) return <SkeletonBody howMany={2} loading={loading} />;
    if (error) return <Text style={styles.errorText}>{error}</Text>;
    if (branches.length === 0) return <NoBranchs title={"No Branches Found"} />;
    return <MapOnBranches branches={branches} />;
  };

  return (
    <Container>
      <BranchName cityName={cityName} counter={branches.length} />

      {renderContent()}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Container>
  );
};

const BranchName = ({ cityName, counter }) => (
  <View style={styles.cityNameContainer}>
    <Text style={styles.cityName}>{cityName}</Text>
    <View style={styles.cityCount}>
      <Text style={styles.cityCountText}>{counter}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cityNameContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    height: 40,
    gap: 10,
  },
  cityName: {
    color: colors.muteColor,
    fontWeight: "bold",
  },
  cityCountText: {
    color: colors.white,
    fontWeight: "bold",
  },
  cityCount: {
    backgroundColor: colors.muteColor,
    width: 20,
    height: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: colors.red, // Assuming you have a red color defined in your colors
    textAlign: "center",
    padding: 20,
  },
});

export default BranchesPage;
