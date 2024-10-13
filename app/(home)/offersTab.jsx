import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { colors } from '@constants';
import OfferList from '@component/home/OfferTab/OfferList';

const Offers = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.branchesContainer}>
        <OfferList setSelectedOffer={setSelectedOffer} selectedOffer={selectedOffer} />
      </View>
    </View>
  );
};

export default Offers;

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%' },
  listContainer: {
    width: '100%',
    height: 75,
    backgroundColor: colors.primary,
  },
  branchesContainer: {
    width: '100%',
    height: '100%',
    marginBottom: 75,
    backgroundColor: colors.white,
  },
});
