// SelectCity.js
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React from 'react';
import { colors } from '@constants';
import { Skeleton } from 'moti/skeleton'; // Import Moti Skeleton
import { SkeletonCommonProps } from '@styles/globalStyle';
import useCities from '@hooks/useCities'; // Import the custom hook

const SelectCity = ({ setCity, setCityId, setVisible }) => {
  const { cityData, loading, handleOnPressItem } = useCities();
  console.log(JSON.stringify(cityData, null, 2));

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => handleOnPressItem(item, setCity, setCityId, setVisible)}
      style={styles.pressableContainer}>
      <View style={styles.pressable}>
        <Text style={styles.whyText}>{item.cityName} </Text>
      </View>
    </Pressable>
  );

  const renderSkeleton = () => (
    <View style={styles.skeletonItemContainer}>
      <Skeleton height={50} width={'100%'} radius={4} show={loading} {...SkeletonCommonProps} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={loading ? Array.from({ length: 8 }) : cityData} // Show skeletons or city data
        keyExtractor={(item, index) => (loading ? index.toString() : item.id.toString())}
        renderItem={loading ? renderSkeleton : renderItem}
        contentContainerStyle={styles.contentContainer}
        extraData={loading} // Ensure FlatList re-renders on loading state change
      />
    </View>
  );
};

export default SelectCity;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  skeletonItemContainer: {
    marginVertical: 5, // Space between skeletons
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.backgroundColor,
  },
  pressableContainer: {
    width: '100%',
  },
  contentContainer: {
    backgroundColor: colors.backgroundColor,
    padding: 10,
    gap: 10,
  },
});
