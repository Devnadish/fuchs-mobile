import React, { useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { router } from "expo-router";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import { colors } from "@constants";
import ExpoImage from "@component/shared/ExpoImage";

const UserAvatar = () => {
  const { userAvatar, userName, userMobile } = useUserAuth();

  const handlePress = () => {
    router.push("/(profile)/home");
  };

  const avatarContent = useMemo(() => {
    if (userAvatar) {
      return <ExpoImage image={userAvatar} style={styles.image} />;
    }

    const initial = userName ? userName.charAt(0).toUpperCase() : "N";
    return (
      <View style={styles.initialContainer}>
        <Text style={styles.initialText}>{initial}</Text>
      </View>
    );
  }, [userAvatar, userName]);
  // FIXME: check if login as guest
  return (
    <TouchableOpacity onPress={handlePress} style={styles.avatarContainer}>
      <View style={styles.imageContainer}>{avatarContent}</View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userName || "No Name"}</Text>
      </View>
    </TouchableOpacity>
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
  initialContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  initialText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontWeight: "bold",
  },
});

export default UserAvatar;
