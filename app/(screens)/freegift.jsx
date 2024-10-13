import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { colors } from '@constants';
import Container from '@component/shared/Containner';
import ExpoImage from '@component/shared/ExpoImage';
import { Skeleton } from 'moti/skeleton';
import { SkeletonCommonProps } from '@styles/globalStyle';
import useServiceGift from '@hooks/useServiceGift';
import { StackScreenOption } from '@constants/headerBarStyle';
import useIcon from '@hooks/useIcon';

export default function FreeGift() {
  const params = useLocalSearchParams();
  const { serviceId, description, title } = params;

  const { gift, loading } = useServiceGift(serviceId); // Using custom hook
  const iconGift = useIcon('gift', 40, colors.green);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <ExpoImage image={item.image} style={styles.image} height={150} width={150} />
      <Text style={styles.itemText}>{item?.gift}</Text>
    </View>
  );

  return (
    <Container>
      <Stack.Screen
        options={{
          title,
          ...StackScreenOption,
        }}
      />
      {loading ? (
        <Skeleton height={100} width={'100%'} radius={10} {...SkeletonCommonProps} />
      ) : (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
          {iconGift}
        </View>
      )}

      <FlatList
        data={gift.gifts} // Ensure this is an array
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Ensure id is a string
        contentContainerStyle={styles.listContainer}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: colors.textColor,
    minHeight: 50,
    backgroundColor: colors.muteColor,
    padding: 5,
  },
  listContainer: {
    gap: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  descriptionContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '80%',
  },
  descriptionText: {
    color: colors.muteColor,
    fontSize: 16,
    textTransform: 'capitalize',
    padding: 10,
  },
});
