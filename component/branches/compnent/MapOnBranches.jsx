import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import BranchFooter from "./BranchFooter";
import colors from "@constants/colors";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import ExpoImage from "@component/shared/ExpoImage";

export default function MapOnBranches({ branches }) {
  const { userLanguage } = useUserAuth();

  const renderBranchItem = ({ item }) => (
    <View style={styles.branchContainer}>
      <ExpoImage
        image={item.masterImage}
        style={styles.branchImage}
        accessibilityLabel={`Image of ${
          userLanguage === "ar" ? item.nameAr : item.nameEn
        }`} // Accessibility label
      />
      <BranchFooter item={item} />
    </View>
  );

  return (
    <FlatList
      data={branches}
      renderItem={renderBranchItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      numColumns={2} // Display two items per row
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.backgroundColor,
    justifyContent: "center",
    gap: 10,
  },
  branchContainer: {
    width: "47%", // Each item takes up 48% of the width to fit two per row
    margin: 5, // Add margin for spacing between items
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
  },
  branchImage: {
    width: "100%",
    aspectRatio: 1,
    flexGrow: 1,
  },
});
