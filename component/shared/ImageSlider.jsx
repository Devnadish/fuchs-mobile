import React, { useRef } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { StyleSheet, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';

const colors = ['#B0604D', '#899F9C', '#B3C680', '#5C6265', '#F5D399', '#F1F1F1'];

const ImageSlider = () => {
  const carouselRef = useRef(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        autoPlayInterval={1000}
        data={colors}
        height={220}
        loop
        pagingEnabled
        snapEnabled
        width={430 * 0.75}
        style={styles.carouselStyle}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: 'right',
          stackInterval: 18,
        }}
        customConfig={() => ({ type: 'positive', viewCount: 5 })}
        renderItem={renderItem}
      />
    </View>
  );
};

const renderItem = ({ index }) => <SlideItem index={index} />;

const SlideItem = ({ index }) => {
  const backgroundColor = colors[index % colors.length];

  return (
    <Animated.View style={[styles.slideContainer, { backgroundColor }]}>
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>{index}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 240,
  },
  carouselStyle: {
    height: 240,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
});

export default ImageSlider;
