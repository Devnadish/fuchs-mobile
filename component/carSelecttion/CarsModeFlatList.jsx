import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@constants';
import { MotiView } from 'moti';
import PropTypes from 'prop-types'; // Import PropTypes

export default function CarsModeFlatList({ carsModel, userLanguage, setSelectedCar }) {
  const [selectedModel, setSelectedModel] = useState('Select Model');

  const handleOnPressItemModel = item => {
    const modelName = userLanguage === 'ar' ? item?.carModelAr : item?.carModelEn;

    setSelectedModel({
      modelId: item.id.toString(),
      ModelName: modelName,
    });

    setSelectedCar(prevSelectedCar => ({
      ...prevSelectedCar,
      modelId: item.id.toString(),
      model: modelName,
    }));
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedModel && selectedModel.modelId === item.id;

    return (
      <Pressable
        onPress={() => handleOnPressItemModel(item)}
        style={[
          styles.pressableItemModel,
          isSelected && {
            borderWidth: 1.5,
            borderRadius: 4,
            backgroundColor: colors.primary,
          },
        ]}>
        <View style={styles.pressableContainerModel}>
          <Text style={[styles.text, isSelected ? styles.selectedText : null]}>
            {userLanguage === 'ar' ? item.carModelAr : item.carModelEn}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.modelContainer}>
      <FlatList
        data={carsModel}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.modelContentContainer}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        ListEmptyComponent={
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 500 }}
            style={styles.loadingSkeleton}>
            <Text style={styles.loadingText}>No Models Defined...</Text>
          </MotiView>
        }
      />
    </View>
  );
}

// Define prop types for CarsModeFlatList
// CarsModeFlatList.propTypes = {
//   carsModel: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       carModelAr: PropTypes.string,
//       carModelEn: PropTypes.string,
//     })
//   ).isRequired, // Validate carsModel as required array of objects
//   userLanguage: PropTypes.string.isRequired, // Validate userLanguage as required string
//   setSelectedCar: PropTypes.func.isRequired, // Validate setSelectedCar as required function
// };

const styles = StyleSheet.create({
  modelContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.white,
  },
  modelContentContainer: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 10,
  },
  pressableItemModel: {
    width: '100%',
    height: 50,
    backgroundColor: colors.backgroundColor,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
  },
  pressableContainerModel: {
    justifyContent: 'center',
    width: '100%',
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.textColor,
  },
  selectedText: {
    color: colors.white, // Change this to the desired color when selected
  },
  loadingSkeleton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textColor,
  },
});
