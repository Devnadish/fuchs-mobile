import { Dimensions, StyleSheet, View } from "react-native";
import ExpoImage from "../shared/ExpoImage";
import { HEADER_IMAGE, LOGO_IMAGE } from "../../constants/images";

export const HeaderImage = () => {
  return (
    <View>
      <ExpoImage image={HEADER_IMAGE} style={styles.headerImage} />
      <ExpoImage image={LOGO_IMAGE} style={styles.logoImage} />
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
    width: Dimensions.get("window").width,
    height: 316,
  },
});
