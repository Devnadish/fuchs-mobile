import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../../constants";
import ExpoImage from "../../shared/ExpoImage";
import Btn from "../../shared/Btn";
import { cloudUrl } from "../../../constants/images";
import { userAuthContext } from "../../../provider/userAuth/userAuthProvider";
import { uploadImageToCloudnary } from "../../../util/uploadImageToCloudnary";
import { UPDATE_PRIFILE_IMAGE } from "../../../api/updateUserProfile";

export default function ChangeProfile({ setShowModal, setAvatar }) {
  const {
    userAvatar: avatar,
    userMobile,
    updateImageProfile,
  } = useContext(userAuthContext);
  const [userAvatar, setuserAvatar] = useState(cloudUrl + avatar);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setuserAvatar(cloudUrl + avatar);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setuserAvatar(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    let imagePublicId;
    try {
      imagePublicId = await uploadImageToCloudnary(
        userAvatar,
        "oneStopUserAvatar", // cloudainary preset name
        "userAvatar"
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    const userInformation = {
      mobile: userMobile,
      avatar: imagePublicId.public_id || avatar,
    };

    const updateUser = await UPDATE_PRIFILE_IMAGE(userInformation);
    await updateImageProfile(userInformation.avatar);
    setAvatar(cloudUrl + userInformation.avatar);
    // Update the user context

    setLoading(false);
    console.log(imagePublicId);
  };

  const handleCancel = () => {
    setuserAvatar(null);
    setShowModal(false);
  };

  useEffect(() => {
    // pickImage();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainerAndButton}>
        <View style={styles.imageContainer}>
          <ExpoImage image={userAvatar} style={styles.image} />
        </View>
        <Btn
          title={"Change Image"}
          handlePress={pickImage}
          containerStyles={styles.changeButon}
          textStyles={{ color: colors.primary }}
        />
      </View>
      <View style={styles.Buttoncontainer}>
        <Btn
          title={"Save & Post"}
          handlePress={handleUpload}
          containerStyles={styles.Button}
          isLoading={loading}
          loadingText="Uploading..."
        />
        <Btn
          title={"Cancel"}
          handlePress={handleCancel}
          containerStyles={styles.Button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainerAndButton: {
    alignItems: "center",
    gap: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: colors.white,
  },
  Buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  Button: {
    width: "45%",
  },
  changeButon: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderColor: colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.primary,
  },
});
