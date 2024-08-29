import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

const ImageSlider = ({ images, autoplay = false, autoplayDelay = 3000 }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Create a ref for animation

  useEffect(() => {
    if (autoplay && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        flatListRef.current.scrollToIndex({
          index: (currentIndex + 1) % images.length,
          animated: true,
        });
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, images.length, currentIndex]);

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Animated.Image
        source={{ uri: item }}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="cover"
        onLoadStart={() => fadeAnim.setValue(0)} // Fade out
        onLoadEnd={() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start(); // Fade in
        }}
      />
    </View>
  );

  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      />
      {/* <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: width,
    height: 200, // Fixed height to avoid layout shifts
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: "#000", // Change to your desired active color
  },
});

export default ImageSlider;
