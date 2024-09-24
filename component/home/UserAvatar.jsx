import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "../../util/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { LOGO_IMAGE } from "../../constants/images";
import { router } from "expo-router";
import { useUserAuth } from "../../provider/userAuth/userAuthProvider";
import { colors } from "../../constants";
import ExpoImage from "../shared/ExpoImage";

const UserAvatar = () => {
  const { userAvatar, userName, userMobile } = useUserAuth();
  // console.warn(userAvatar);
  const [loading, setLoading] = useState(true);
  const [myImage, setMyImage] = useState(null);

  useEffect(() => {
    if (userAvatar && userMobile !== "Gust") {
      const image = cld
        .image(userAvatar)
        .resize(
          thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
        );
      setMyImage(image);
    } else {
      setMyImage(null);
    }
    setLoading(false);
  }, [userAvatar, userMobile]);

  const handlePress = () => {
    router.push("/(profile)/home");
  };

  const renderImage = () => {
    if (loading) {
      return <ActivityIndicator color={colors.primary} size="small" />;
    }

    return myImage ? (
      <AdvancedImage
        cldImg={myImage}
        style={styles.image}
        onLoadEnd={() => setLoading(false)}
      />
    ) : (
      <ExpoImage image={LOGO_IMAGE} style={styles.image} />
    );
  };

  return (
    <View style={styles.avatarContainer}>
      {userMobile !== "Gust" && (
        <View style={styles.imageContainer}>
          <Pressable onPress={handlePress}>{renderImage()}</Pressable>
        </View>
      )}
      <View
        style={[
          styles.userInfo,
          { flexDirection: userMobile === "Gust" ? "row" : "column" },
        ]}
      >
        <Text>{userName || "No Name"}</Text>
      </View>
    </View>
  );
};

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
  userInfo: {
    alignItems: "flex-start",
    alignSelf: "flex-end",
  },
  userName: {
    fontWeight: "bold",
  },
});

export default UserAvatar;
