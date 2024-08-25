import React, { useContext, useEffect, useState, useCallback } from "react";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import Loader from "../../component/shared/Loader";
import BranchesList from "../../component/branches/BranchesList";
import BranchByCity from "../../component/branches/BranchByCity";
import { groupBranchesByCity } from "../../api/groupBranchesByCity";
import { StyleSheet, View } from "react-native";
import { colors } from "../../constants";
// TODO: Filter by City ==> Get client City and show it as default
// TODO: add buttun to show all branches and back to madinaty

const Branches = () => {
  const { userLanguage } = useContext(userAuthContext);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBranche, setSelectedBranche] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <BranchesList
          setSelectedCity={setSelectedCity}
          userLanguage={userLanguage}
        />
      </View>
      <View style={styles.branchesContainer}>
        <BranchByCity
          userLanguage={userLanguage}
          selectedCity={selectedCity}
          selectedBranches={selectedBranche}
          setSelectedBranches={setSelectedBranche}
        />
      </View>
    </View>
  );
};

export default Branches;

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
  listContainer: {
    width: "100%",
    height: 75,
    backgroundColor: colors.primary,
  },
  branchesContainer: {
    width: "100%",
    height: "90%",
    marginBottom: 75,
    backgroundColor: colors.white,
  },
});
