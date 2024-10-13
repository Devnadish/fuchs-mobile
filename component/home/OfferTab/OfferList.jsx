import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '@constants';
import { SkeletonBodyRow } from '@component/shared/SkeltonBody';
import useOffers from './useOffers';
import ExpoImage from '@component/shared/ExpoImage';

const ITEM_HEIGHT = 200; // Height of each item
const ITEM_WIDTH = '48%'; // Width of each item (for two columns)

const OfferList = ({ selectedOffer }) => {
  const { loading, offers, loadMoreOffers, pageCount, pageNum, userLanguage } =
    useOffers(selectedOffer);

  const renderItem = useCallback(
    ({ item }) => <RenderOfferItem item={item} userLanguage={userLanguage} />,
    [userLanguage]
  );

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      {pageCount === pageNum ? (
        <Text style={styles.footerText}>No more offers to load.</Text>
      ) : loading ? (
        <SkeletonBodyRow howMany={1} loading={true} height={ITEM_HEIGHT} width={ITEM_WIDTH} />
      ) : null}
    </View>
  );

  // Implementing getItemLayout
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT, // Height of each item
    offset: ITEM_HEIGHT * index, // Offset for each item
    index, // Index of the item
  });

  return (
    <View style={styles.container}>
      {loading && offers.length === 0 ? (
        <SkeletonBodyRow howMany={6} loading={true} height={ITEM_HEIGHT} width={ITEM_WIDTH} />
      ) : (
        <FlatList
          data={offers}
          keyExtractor={item => (item.id ? item.id.toString() : `${Date.now()}${Math.random()}`)} // Ensure unique keys
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreOffers}
          onEndReachedThreshold={0.5}
          ListFooterComponent={FooterComponent}
          getItemLayout={getItemLayout} // Adding getItemLayout here
          scrollEventThrottle={200}
        />
      )}
    </View>
  );
};

const RenderOfferItem = memo(
  ({ item, userLanguage }) => {
    const detailText = userLanguage === 'ar' ? item?.detailAr : item?.detailEn;

    return (
      <View style={styles.offerContainer}>
        <ExpoImage image={item?.image} style={styles.offerImage} />
        <Text style={styles.detailsText}>{detailText}</Text>
      </View>
    );
  },
  (prevProps, nextProps) =>
    prevProps.item?.id === nextProps.item?.id && prevProps.userLanguage === nextProps.userLanguage
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  footerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  footerText: {
    color: colors.danger,
    textAlign: 'center',
    width: '100%',
  },
  offerContainer: {
    width: '48%',
    backgroundColor: colors.backgroundColor,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.primary,
    overflow: 'hidden',
    alignItems: 'center',
    margin: '1%',
  },
  offerImage: {
    width: '100%',
    aspectRatio: 1,
  },
  detailsText: {
    color: colors.textColor,
    fontSize: 16,
    padding: 5,
  },
});

// Only one default export
export default OfferList;
