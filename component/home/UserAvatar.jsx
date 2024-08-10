import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "../../util/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGO_IMAGE } from "../../constants/images";
import { router } from "expo-router";
const imageLink =
  "https://res.cloudinary.com/dhyh7aufp/image/upload/v1722634810/oneStop/users/avatar/ilbfgof0n6sftmrurham.jpg";
const imageLink1 = "oneStop/users/avatar/ilbfgof0n6sftmrurham.jpg";
export default function UserAvatar() {
  const [userAvatar, setUserAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserAvatar = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      const { avatar } = JSON.parse(userData);
      setUserAvatar(avatar);
    }
  };

  useEffect(() => {
    getUserAvatar();
  }, []);

  const myimage = cld.image(imageLink1);

  myimage.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
  );
  return (
    <View style={{ marginLeft: 10 }}>
      {loading && (
        <View style={styles.imageContainer}>
          {/* <Text>loading</Text> */}
          <Image source={{ uri: LOGO_IMAGE }} style={styles.image} />
        </View>
      )}
      <Pressable onPress={() => router.push("/(profile)/profile")}>
        <View style={styles.imageContainer}>
          <AdvancedImage
            cldImg={myimage}
            style={styles.image}
            onLoadEnd={() => setLoading(false)}
          />
          {/* <Image source={{ uri: userAvatar }} style={styles.image} /> */}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
