import React from "react";
import ExtarList from "@component/branches/compnent/ExtarList";
import Container from "@component/shared/Containner";
import BranchesPage from "@component/branches/compnent/BranchesPage";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";

const Branches = () => {
  const { userCityId, userCity } = useUserAuth();
  return (
    <Container>
      <ExtarList />
      <BranchesPage cityId={userCityId} cityName={userCity} />
    </Container>
  );
};

export default Branches;
