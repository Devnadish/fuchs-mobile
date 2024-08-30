import {
  Dimensions,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import ExpoImage from "../shared/ExpoImage";
import { HEADER_IMAGE, LOGO_IMAGE } from "../../constants/images";

export const HeaderImage = () => {
  const { width } = useWindowDimensions();
  return (
    <View>
      <ExpoImage
        image={HEADER_IMAGE}
        style={[styles.headerImage, { width: width }]}
        width={width}
        height={316}
      />
      <ExpoImage
        image={LOGO_IMAGE}
        style={styles.logoImage}
        width={120}
        height={120}
      />
    </View>
  );
};
export const styles = StyleSheet.create({
  logoImage: {
    width: 120,
    height: 120,
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: 50 }], // center the image from bottom
  },
  headerImage: {
    height: 316,
  },
});
