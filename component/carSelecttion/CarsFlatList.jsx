import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { colors } from '@constants';
import ExpoImage from '@component/shared/ExpoImage';
import { baseContainerStyle } from '@styles/globalStyle';
import SkeletonBody from '@component/shared/SkeltonBody';
import useSelectCar from '@hooks/useSelectCar';

export default function CarsFlatList({
  cars,
  setCarsModel,
  userLanguage,
  loading, // Prop to indicate loading state
}) {
  const { selectedCar, handlePressItem } = useSelectCar(null); // Initialize the hook

  const renderItem = ({ item }) => {
    const isSelected = selectedCar?.carId === item.id;
    const carName = userLanguage === 'ar' ? item.carAr : item.carEn;

    return (
      <Pressable
        onPress={() => handlePressItem(item, userLanguage, setCarsModel)}
        style={styles.pressableItem}>
        <View
          style={[styles.pressableContainer, isSelected && { backgroundColor: colors.primary }]}>
          <View style={styles.imageContainer}>
            <ExpoImage
              image={`${process.env.EXPO_PUBLIC_CLOUDINARY_ENDPOINT}${item.public_id}`}
              style={styles.carImage}
              fit="contain"
            />
          </View>
          <Text style={[styles.text, isSelected && styles.selectedText]}>{carName}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.carContainer}>
      {loading ? (
        <SkeletonBody howMany={5} loading={loading} height={120} width={'100%'} />
      ) : (
        <FlatList
          data={cars}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          horizontal
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  carContainer: {
    ...baseContainerStyle,
    backgroundColor: colors.backgroundColor,
    height: 120,
    padding: 10,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  carImage: {
    width: 50,
    height: 50,
    aspectRatio: 1,
    borderRadius: 12,
  },
  pressableItem: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textColor,
    textTransform: 'capitalize',
  },
  selectedText: {
    color: colors.white,
  },
});
