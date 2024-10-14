import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import Animated from 'react-native-reanimated';

const ImageSlider = ({ images }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if images are provided and set loading to false
    if (images && images.length > 0) {
      setLoading(false);
    }
  }, [images]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        autoPlay
        autoPlayInterval={3000}
        data={images}
        height={240}
        loop
        pagingEnabled
        snapEnabled
        width={430 * 0.75}
        style={styles.carouselStyle}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: 'left',
          stackInterval: 18,
        }}
        customConfig={() => ({ type: 'positive', viewCount: 5 })}
        renderItem={renderItem(images)} // Pass images to renderItem
      />
    </View>
  );
};

const renderItem =
  images =>
  ({ index }) => {
    const imageUrl = images[index % images.length].image; // Access the image URL from the object

    return (
      <Animated.View style={styles.slideContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        {/* <View style={styles.overlay}>
          <Text style={styles.overlayText}>{images[index % images.length].id}</Text>
        </View> */}
      </Animated.View>
    );
  };

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 240,
  },
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
    overflow: 'hidden', // Ensure the image respects the border radius
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Cover the entire slide
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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

// import React, { useEffect, useState } from 'react';
// import Carousel from 'react-native-reanimated-carousel';
// import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
// import Animated from 'react-native-reanimated';

// const ImageSlider = ({ images }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if images are provided and set loading to false
//     if (images && images.length > 0) {
//       setLoading(false);
//     }
//   }, [images]);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Carousel
//         autoPlay
//         autoPlayInterval={3000}
//         data={images}
//         height={220}
//         loop
//         pagingEnabled
//         snapEnabled
//         width={430 * 0.75}
//         style={styles.carouselStyle}
//         mode="horizontal-stack"
//         modeConfig={{
//           snapDirection: 'left',
//           stackInterval: 18,
//         }}
//         customConfig={() => ({ type: 'positive', viewCount: 5 })}
//         renderItem={renderItem(images)} // Pass images to renderItem
//       />
//     </View>
//   );
// };

// const renderItem =
//   images =>
//   ({ index }) => {
//     const imageUrl = images[index % images.length];

//     return (
//       <Animated.View style={styles.slideContainer}>
//         <Image source={{ uri: imageUrl }} style={styles.image} />
//         <View style={styles.overlay}>
//           <Text style={styles.overlayText}>{index + 1}</Text>
//         </View>
//       </Animated.View>
//     );
//   };

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 240,
//   },
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     height: 240,
//   },
//   carouselStyle: {
//     height: 240,
//   },
//   slideContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     overflow: 'hidden', // Ensure the image respects the border radius
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover', // Cover the entire slide
//   },
//   overlay: {
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
//   },
//   overlayText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 10,
//     borderRadius: 10,
//   },
// });

// export default ImageSlider;
