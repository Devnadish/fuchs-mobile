import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants";
import { getBranchByCity } from "../../api/getBranchByCity";
import Loader from "../shared/Loader";
import RenderBranchItem from "./RenderBranchItem";

const Limit = 5;
let pageNum = 1;

const BranchByCity = ({ userLanguage, selectedCity }) => {
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const getBranches = async (page) => {
    // console.log("getBranches page: ", page);
    setLoading(true);
    const { allBranches, totalPage } = await getBranchByCity(
      userLanguage,
      page,
      Limit,
      selectedCity
    );
    setLoading(false);
    setPageCount(totalPage);
    return allBranches;
  };
  // load initial branches
  useEffect(() => {
    const fetchInitialBranches = async () => {
      const initialBranches = await getBranches(pageNum);
      setBranches(initialBranches);
    };

    fetchInitialBranches();
  }, []);

  // call api to load more branches to improve performance and  infinite scroll
  const handleLoadMore = async () => {
    if (loading) {
      return;
    }

    if (pageNum >= pageCount) {
      // console.log("No more branches to load.", { pageNum, pageCount });
      return;
    } else {
      pageNum = pageNum + 1;
    }
    setLoading(true);
    const loadMoreBranches = await getBranches(pageNum);
    setLoading(false);

    setBranches((prevBranches) => [...prevBranches, ...loadMoreBranches]);
  };

  const renderItem = useCallback(({ item, index }) => {
    return (
      <RenderBranchItem item={item} index={index} userLanguage={userLanguage} />
    );
  });
  if (branches.length === 0) return null;

  const FooterIfNoMoreBranches = () => {
    return (
      <>
        {pageCount === pageNum ? (
          <Text style={{ color: colors.danger, width: "100%" }}>
            No more branches to load.
          </Text>
        ) : (
          <Loader loading={loading} />
        )}
      </>
    );
  };

  return (
    <FlatList
      data={branches}
      initialNumToRender={5}
      keyExtractor={(item, index) => item.id.toString() + index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 10, alignItems: "center" }}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={3}
      ListFooterComponent={() => (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: colors.danger,
            marginBottom: 20,
            height: 50,
            width: "100%",
          }}
        >
          <FooterIfNoMoreBranches />
        </View>
      )}
    />
  );
};

export default BranchByCity;
