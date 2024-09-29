import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "@constants";
import Loader from "@component/shared/Loader";
import RenderOfferItem from "./RenderOfferItem";
import { getOffers } from "@api/getOffers";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import { SkeletonBodyRow } from "@component/shared/SkeltonBody";

const Limit = 5;

const OfferList = ({ setSelectedOffer, selectedOffer }) => {
  const { userLanguage } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNum, setPageNum] = useState(1); // Use state for pageNum

  const fetchOffers = async () => {
    setLoading(true);
    const { allOffers, totalPage } = await getOffers(
      userLanguage,
      pageNum,
      Limit,
      selectedOffer
    );
    setOffers((prevOffers) => [...prevOffers, ...allOffers]);
    setPageCount(totalPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, [userLanguage, selectedOffer, pageNum]); // Fetch offers when dependencies change

  const handleLoadMore = () => {
    if (!loading && pageNum < pageCount) {
      setPageNum((prevPageNum) => prevPageNum + 1); // Increment pageNum
    }
  };

  const renderItem = useCallback(
    ({ item }) => <RenderOfferItem item={item} userLanguage={userLanguage} />,
    [userLanguage]
  );

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      {pageCount === pageNum ? (
        <Text style={styles.footerText}>No more Offers to load.</Text>
      ) : (
        <Loader loading={loading} />
      )}
    </View>
  );

  return (
    <View style={{ width: "100%" }}>
      {loading ? (
        <SkeletonBodyRow
          howMany={6}
          loading={true}
          height={200}
          width={"48%"}
        />
      ) : (
        <FlatList
          data={offers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={FooterComponent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  footerContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  footerText: {
    color: colors.danger,
    textAlign: "center",
    width: "100%",
  },
});

export default OfferList;
