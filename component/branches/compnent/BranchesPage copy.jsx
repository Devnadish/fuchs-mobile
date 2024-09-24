import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { colors } from "../../../constants";
import { useUserAuth } from "../../../provider/userAuth/userAuthProvider";
import { getBranchByCity } from "../../../api/getBranchByCity";
import Container from "../../shared/Containner";
import SkeletonBody from "../../shared/SkeltonBody";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapOnBranches from "./MapOnBranches";
import NoBranchs from "./NoBranchs";

const Limit = 6;

export default function BranchesPage({ cityId, cityName }) {
  const { userLanguage, renderData, userId } = useUserAuth();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
      setTotalPages(totalPage); // Calculate total pages
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBranches(currentPage); // Fetch branches when the component mounts or when currentPage changes
  }, [currentPage, renderData, cityId, userLanguage, userId]);

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
      <View style={styles.cityNameContainer}>
        <Text style={styles.cityName}>{cityName}</Text>
        <View style={styles.cityCount}>
          <Text style={styles.cityCountText}>{branches.length}</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <SkeletonBody howMany={2} loading={loading} />
        ) : branches.length === 0 ? (
          <NoBranchs
            icon={
              <MaterialCommunityIcons
                name="home-city"
                size={124}
                color={colors.primary}
              />
            }
            title={"No Branches Found"}
          />
        ) : (
          <MapOnBranches branches={branches} heartType={"add"} />
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

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    backgroundColor: colors.backgroundColor,
  },
  cityNameContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    gap: 10,
  },
  cityName: {
    color: colors.white,
    fontWeight: "bold",
  },
  cityCountText: {
    color: colors.textColor,
    fontWeight: "bold",
  },
  cityCount: {
    backgroundColor: colors.yellow,
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
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

// import React, { useEffect, useState } from "react";
// import { ScrollView, StyleSheet, Text, View } from "react-native";
// import { colors } from "../../../constants";
// import { useUserAuth } from "../../../provider/userAuth/userAuthProvider";
// import { getBranchByCity } from "../../../api/getBranchByCity";
// import Container from "../../shared/Containner";
// import SkeletonBody from "../../shared/SkeltonBody";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import MapOnBranches from "./MapOnBranches";
// import NoBranchs from "./NoBranchs";

// const Limit = 6;

// export default function BranchesPage({ cityId, cityName }) {
//   const { userLanguage, renderData, userId } = useUserAuth();
//   const [branches, setBranches] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getBranches = async () => {
//     setLoading(true);
//     try {
//       const { allBranches } = await getBranchByCity(
//         userLanguage,
//         1, // Always fetch the first page
//         Limit,
//         cityId,
//         userId
//       );
//       setBranches(allBranches);
//     } catch (error) {
//       console.error("Error fetching branches:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getBranches(); // Fetch branches when the component mounts or when dependencies change
//   }, [renderData, cityId, userLanguage, userId]);

//   return (
//     <Container>
//       <View style={styles.cityNameContainer}>
//         <Text style={styles.cityName}>{cityName}</Text>
//         <View style={styles.cityCount}>
//           <Text style={styles.cityCountText}>{branches.length}</Text>
//         </View>
//       </View>
//       <ScrollView
//         contentContainerStyle={styles.scroll}
//         showsVerticalScrollIndicator={false}
//       >
//         {loading ? (
//           <SkeletonBody howMany={2} loading={loading} />
//         ) : branches.length === 0 ? (
//           <NoBranchs
//             icon={
//               <MaterialCommunityIcons
//                 name="home-city"
//                 size={124}
//                 color={colors.primary}
//               />
//             }
//             title={"No Branches Found"}
//           />
//         ) : (
//           <MapOnBranches branches={branches} heartType={"add"} />
//         )}
//       </ScrollView>
//     </Container>
//   );
// }

// const styles = StyleSheet.create({
//   scroll: {
//     width: "100%",
//     backgroundColor: colors.backgroundColor,
//   },
//   cityNameContainer: {
//     flexDirection: "row",
//     width: "100%",
//     padding: 10,
//     backgroundColor: colors.primary,
//     alignItems: "center",
//     justifyContent: "center",
//     height: 40,
//     gap: 10,
//   },
//   cityName: {
//     color: colors.white,
//     fontWeight: "bold",
//   },
//   cityCountText: {
//     color: colors.textColor,
//     fontWeight: "bold",
//   },
//   cityCount: {
//     backgroundColor: colors.yellow,
//     width: 25,
//     height: 25,
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
