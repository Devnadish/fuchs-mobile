import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "../../util/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { LOGO_IMAGE } from "../../constants/images";
import { router } from "expo-router";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { colors } from "../../constants";

export default function UserAvatar() {
  const { userAvatar, userName } = useContext(userAuthContext);
  const [loading, setLoading] = useState(true);

  let myimage;
  if (userAvatar) {
    myimage = cld.image(userAvatar);
    myimage.resize(
      thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
    );
  } else {
    myimage = cld.image(LOGO_IMAGE);
  }

  return (
    <View style={styles.avatarContainer}>
      {loading && (
        <View style={styles.imageContainer}>
          <ActivityIndicator
            animating={loading}
            color={colors.primary}
            size="small"
          />
          {/* <Image source={{ uri: LOGO_IMAGE }} style={styles.image} /> */}
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-end",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Hi.. </Text>
        <Text>{userName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginLeft: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
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
