import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants";
import { getBranchByCity } from "../../api/getBranchByCity";
import Loader from "../shared/Loader";
import RenderBranchItem from "./RenderBranchItem";
import { useUserAuth } from "../../provider/userAuth/userAuthProvider";

const Limit = 6;

const BranchByCity = ({
  selectedCity,
  setRerender,
  pageNum,
  setPageNum,
  queyType,
  activeBtn,
  rerender,
  setActiveBtn,
}) => {
  const { userLanguage, userId } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const getBranches = async (page) => {
    setLoading(true);
    try {
      const { allBranches, totalPage } = await getBranchByCity(
        userLanguage,
        page,
        Limit,
        selectedCity?.id,
        userId
      );
      setPageCount(totalPage);
      return allBranches;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialBranches = async () => {
      const initialBranches = await getBranches(pageNum);
      setBranches(initialBranches);
    };

    fetchInitialBranches();
  }, [selectedCity, queyType, pageNum, rerender]);

  const handleLoadMore = async () => {
    if (loading || pageNum >= pageCount) return;

    setPageNum((prev) => prev + 1);
    const loadMoreBranches = await getBranches(pageNum + 1);
    setBranches((prevBranches) => [...prevBranches, ...loadMoreBranches]);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <RenderBranchItem
        item={item}
        userLanguage={userLanguage}
        setRerender={setRerender}
        queyType={queyType}
        activeBtn={activeBtn}
        setActiveBtn={setActiveBtn}
      />
    ),
    [userLanguage, setRerender, queyType]
  );

  if (branches.length === 0 && !loading) return null;

  const FooterIfNoMoreBranches = () => (
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

  return (
    <>
      <FlatList
        data={branches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        numColumns={2} // Display two items per row
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <FooterIfNoMoreBranches />
          </View>
        )}
      />
    </>
  );
};

export default BranchByCity;

const styles = StyleSheet.create({
  queyText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.primary,
    paddingBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: 50,
    width: "100%",
  },
});
