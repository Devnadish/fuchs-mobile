import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import imageHeader from "../../assets/images/authHeaderImag.webp";
import avatrHeader from "../../assets/images/fucksAvatar.png";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";
import { useRouter } from "expo-router";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export default function HeaderWithImage({ back = false }) {
  return (
    // <View style={styles.container}>
    <View style={styles.header}>
      <Image
        style={styles.image}
        source={imageHeader}
        placeholder={{ blurhash }}
        contentFit="fill"
        transition={1000}
        cachePolicy={"none"}
        stretchMode="default"
      />
      <Image
        style={styles.imageAvatr}
        source={avatrHeader}
        placeholder={{ blurhash }}
        contentFit="fill"
        transition={1000}
        cachePolicy={"none"}
        stretchMode="default"
      />
      {back && <BackBtn />}
    </View>
    // </View>
  );
}

const BackBtn = () => {
  router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <View style={styles.backBtn} onPress={goBack}>
      <Button title="Back" onPress={goBack} />
      {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
      {/* </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flex: 1,
    position: "relative", // Set container to be absolutely positioned
    overflow: "hidden", // Ensure image covers container
  },
  image: {
    position: "absolute", // Place image absolutely within header
    top: 0, // Position image at top of header
    left: 0, // Position image at left of header
    width: "100%", // Ensures image stretches to header width
    height: "100%", // Ensures image fills header height proportionally
    resizeMode: "cover", // Ensure image covers the space
  },
  imageAvatr: {
    position: "absolute", // Place image absolutely within header
    bottom: "50%", // Position image at center of header
    marginBottom: -75, // Adjust bottom margin to half of the image height
    left: "50%", // Position image at center of header
    marginLeft: -75, // Adjust left margin to half of the image width
    width: 150, // Ensures image stretches to header width
    height: 150, // Ensures image fills header height proportionally
    resizeMode: "cover", // Ensure image covers the space
  },
  backBtn: {
    position: "absolute",
    top: "30%",
    left: 10,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
});
