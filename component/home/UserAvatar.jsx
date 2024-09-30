import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LOGO_IMAGE } from "@constants/images";
import { router } from "expo-router";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import { colors } from "@constants";
import ExpoImage from "@component/shared/ExpoImage";
import {
  generateCloudinaryUrl,
  transformations,
} from "@util/uploadImageToCloudnary";

const UserAvatar = () => {
  const { userAvatar, userName, userMobile } = useUserAuth();

  const transformedImageUrl = generateCloudinaryUrl(
    userAvatar,
    transformations
  );
  const [loading, setLoading] = useState(true);
  const [myImage, setMyImage] = useState(transformedImageUrl);

  useEffect(() => {
    if (userAvatar && userMobile !== "Gust") {
      setMyImage(transformedImageUrl);
      setLoading(false);
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
      <ExpoImage image={myImage} style={styles.image} />
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
    alignItems: "center",
  },
  userName: {
    fontWeight: "bold",
  },
});

export default UserAvatar;
