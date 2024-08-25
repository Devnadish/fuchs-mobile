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
  // console.log(JSON.stringify(branch, null, 2));
  useEffect(() => {
    getBranch();
  }, []);
  return (
    <Containner>
      <BrHeader branchName={branchName} />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",

          borderColor: colors.borderColor,
          backgroundColor: colors.white,
          alignSelf: "center",
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <BranchImages images={branch?.image} />
      </View>
      <BranchDetails branch={branch} userlanguage={userLanguage} />
      <View style={{ backgroundColor: colors.white, padding: 10 }}>
        <BranchActions
          lat={branch?.lat}
          long={branch?.long}
          brid={branchId}
          branchName={branchName}
          phoneNumber={branch?.mobile}
        />
      </View>
    </Containner>
  );
}
