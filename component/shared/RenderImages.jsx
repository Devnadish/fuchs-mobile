import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ExpoImage from '@component/shared/ExpoImage';
import { SkeletonBodyRow } from '@component/shared/SkeltonBody';

const RenderImages = ({ images, loading, skeletonCount = 2 }) => {
  const renderImageItem = useCallback(({ item }) => <ImageItem image={item.url} />, []);

  const renderSkeletons = () => (
    <View style={styles.loadingContainer}>
      <SkeletonBodyRow howMany={skeletonCount} loading={loading} height={200} width={'48%'} />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        renderSkeletons()
      ) : (
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={styles.flatListContent}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const ImageItem = ({ image }) => {
  return (
    <View style={styles.imageContainer}>
      <ExpoImage image={image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 200,
  },
  flatListContent: {
    padding: 10,
    gap: 10,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
});

export default RenderImages;
