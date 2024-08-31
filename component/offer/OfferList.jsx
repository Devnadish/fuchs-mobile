import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants";
import Loader from "../shared/Loader";
import RenderOfferItem from "./RenderOfferItem";
import { getOffers } from "../../api/getOffers";

const Limit = 5;
let pageNum = 1;

const OfferList = ({ userLanguage, setSelectedOffer, selectedOffer }) => {
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const getOfferData = async () => {
    setLoading(true);
    const { allOffers, totalPage } = await getOffers(
      userLanguage,
      pageNum,
      Limit,
      selectedOffer
    );
    setLoading(false);
    setPageCount(totalPage);
    return allOffers;
  };
  // load initial Offer
  useEffect(() => {
    const fetchInitialOffer = async (
      userLanguage,
      pageNum,
      Limit,
      selectedOffer
    ) => {
      const initialOffer = await getOfferData(
        userLanguage,
        pageNum,
        Limit,
        selectedOffer
      );
      // console.log({ initialOffer });
      setOffers(initialOffer);
    };

    fetchInitialOffer();
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

    const loadMoreOffers = await getOfferData(
      userLanguage,
      pageNum,
      Limit,
      selectedOffer
    );
    setLoading(false);

    setOffers((prevOffers) => [...prevOffers, ...loadMoreOffers]);
  };

  const renderItem = useCallback(({ item, index }) => {
    return (
      <RenderOfferItem item={item} index={index} userLanguage={userLanguage} />
    );
  });

  if (offers?.length === 0) return null;

  const FooterIfNoMoreOffers = () => {
    return (
      <>
        {pageCount === pageNum ? (
          <Text style={{ color: colors.danger, width: "100%" }}>
            No more Offers to load.
          </Text>
        ) : (
          <Loader loading={loading} />
        )}
      </>
    );
  };

  return (
    // <Text>{JSON.stringify(offers)}</Text>
    <FlatList
      data={offers}
      keyExtractor={(item, index) => item.id.toString() + index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 10, alignItems: "center" }}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={3}
      windowSize={1}
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      ListFooterComponent={() => (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            height: 50,
            width: "100%",
          }}
        >
          <FooterIfNoMoreOffers />
        </View>
      )}
    />
  );
};

export default OfferList;
