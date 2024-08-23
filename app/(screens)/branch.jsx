import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Containner from "../../component/shared/Containner";

import { branchDetail } from "../../api/branchDetail";
import BrHeader from "../../component/branches/detail/BrHeader";
import BranchImages from "../../component/branches/detail/BranchImages";
import BranchActions from "../../component/branches/detail/BranchActions";
import BranchDetails from "../../component/branches/detail/BranchDetails";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { View } from "react-native";
import ComplainAndRate from "../../component/branches/detail/ComplainAndRate";
import { colors } from "../../constants";

export default function Bbranch() {
  const params = useLocalSearchParams();
  const { branchId, branchName } = params;
  const [branch, setBranch] = useState();
  const { userLanguage } = useContext(userAuthContext);

  // console.log(JSON.stringify(branch?.image[0], null, 2));

  const getBranch = async () => {
    const data = await branchDetail(branchId);
    setBranch(data);
  };
  console.log(JSON.stringify(branch, null, 2));
  useEffect(() => {
    getBranch();
  }, []);
  return (
    <Containner>
      <BrHeader branchName={branchName} />
      <View
        style={{
          flexDirection: "row",
          width: "95%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          // elevation: 5,
          borderWidth: 1,
          borderColor: "#ccc",
          backgroundColor: "#fff",
          borderRadius: 20,
          alignSelf: "center",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: "70%",
            height: "100%",
            // borderWidth: 1,
            // borderColor: "#000",
            overflow: "hidden",
          }}
        >
          <BranchImages images={branch?.image} />
        </View>
        <View style={{ width: "30%", height: "100%", padding: 10 }}>
          <BranchActions
            lat={branch?.lat}
            long={branch?.long}
            brid={branchId}
            branchName={branchName}
            phoneNumber={branch?.mobile}
          />
        </View>
      </View>
      <BranchDetails branch={branch} userlanguage={userLanguage} />
      <View style={{ backgroundColor: colors.white, padding: 10 }}>
        <ComplainAndRate userlanguage={userLanguage} brid={branchId} />
      </View>
    </Containner>
  );
}
