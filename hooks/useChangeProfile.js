// useChangeProfile.js
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { uploadImage } from "@util/uploadImageToCloudnary";
import { UPDATE_PRIFILE_IMAGE } from "@api/updateUserProfile";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import { useLoading } from "@provider/LoadingProvider/LoadingContext";

const useChangeProfile = (setShowModal) => {
  const { userAvatar, userMobile, updateProfile } = useUserAuth();
  const { setLoading } = useLoading();
  const [avatar, setAvatar] = useState(userAvatar);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loadFromGallery, setLoadFromGallary] = useState(false);

  useEffect(() => {
    setAvatar(userAvatar);
  }, [userAvatar]);

  const pickImage = async () => {
    setLoadFromGallary(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    } else {
      Alert.alert("No image selected", "Please select an image to upload.");
    }
    setLoadFromGallary(false);
  };

  const handleUpload = async () => {
    setIsUpdating(true);

    try {
      const imageData = {
        uri: avatar,
        type: `image/${avatar.split(".").pop()}`,
        name: `image.${avatar.split(".").pop()}`,
      };

      const imagePublicId = await uploadImage(
        imageData,
        "oneStopUserAvatar",
        setLoading
      );
      const userInformation = {
        mobile: userMobile,
        avatar: imagePublicId?.public_id || userAvatar,
      };

      await UPDATE_PRIFILE_IMAGE(userInformation);
      await updateProfile({ userAvatar: userInformation.avatar });
      Alert.alert("Success", "Profile image updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setAvatar(userAvatar);
    setShowModal(false);
  };

  return {
    avatar,
    pickImage,
    handleUpload,
    handleCancel,
    isUpdating,
    loadFromGallery,
  };
};

export default useChangeProfile;
