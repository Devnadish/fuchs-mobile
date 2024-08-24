import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useCallback, useState, useRef } from "react";
import { Image } from "expo-image";
import ExpoImage from "../../shared/ExpoImage";
const blurhash = "LYLWbgui7e:5V?I:aMbIZ|I.Rknn";
// const blurhash =
//   "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

// TODO: refactore the slide next and prev button & Activete rate & Complain & booking add Auto slider animation
const BranchImages = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const scrollToIndex = (index) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  const scrollToNextItem = () => {
    scrollToIndex(currentIndex + 1);
  };

  const scrollToPrevItem = () => {
    scrollToIndex(currentIndex - 1);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.imageContainer}>
        <ExpoImage image={item.image} style={styles.image} />
        {/* <Image
          source={{ uri: item.image }}
          style={styles.image}
          transition={200}
          contentFit="cover"
          placeholder={{ blurhash }}
        /> */}
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={styles.flatListContent}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5} // Adjust based on your needs
        maxToRenderPerBatch={5} // Adjust based on your needs
        windowSize={5} // Adjust based on your needs
        pagingEnabled
      />
      {/* <Text>
        {images?.length > 0
          ? `Image ${currentIndex + 1} of ${images?.length}`
          : "No images"}
      </Text> */}
      {/* <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
        <Button
          title="Prev"
          onPress={scrollToPrevItem}
          disabled={currentIndex === 0}
        />
        <Button
          title="Next"
          onPress={scrollToNextItem}
          disabled={currentIndex === images?.length - 1}
        />
      </View> */}
    </View>
  );
};

export default BranchImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  flatListContent: {
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // width: "95%",
    width: 200,
    height: 200,
    aspectRatio: 1,
    borderRadius: 20,
  },
});
