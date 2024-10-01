// ChangeProfile.js
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React from "react";
import ExpoImage from "@component/shared/ExpoImage";
import Btn from "@component/shared/Btn";
// Import styles
import useChangeProfile from "@hooks/useChangeProfile";
import styles from "@styles/ChangeProfileStyles";
import colors from "@constants/colors";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";

export default function ChangeProfile({ setShowModal }) {
  const { contextUpdateLoading } = useUserAuth();
  const { pickImage, handleUpload, loadFromGallery, avatar, isUpdating } =
    useChangeProfile(setShowModal);

  return (
    <View style={styles.container}>
      {contextUpdateLoading && (
        <Text style={styles.header}>Update Profile Image</Text>
      )}
      <View style={styles.imageContainerAndButton}>
        <View style={styles.imageContainer}>
          <ExpoImage image={avatar} style={styles.image} />
        </View>
        <ChangeButton
          handlePress={pickImage}
          loadfromGallary={loadFromGallery}
        />
      </View>
      <SaveButton
        handlePress={handleUpload}
        updateContext={isUpdating}
        disabled={loadFromGallery}
      />
    </View>
  );
}

const SaveButton = ({ handlePress, updateContext, disabled }) => {
  return (
    <Btn
      title="Save & Post"
      handlePress={handlePress}
      containerStyles={styles.button}
      loadingText="Updateing..."
      isLoading={updateContext}
      disabled={updateContext || disabled}
    />
  );
};

const ChangeButton = ({ handlePress, loadfromGallary, disabled }) => {
  return (
    <View style={styles.ChangeButton}>
      {loadfromGallary ? (
        <View style={styles.Loadercontainer}>
          <Text style={{ color: colors.primary }}>Loading Image...</Text>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
        <Btn
          title="Change Image"
          handlePress={handlePress}
          containerStyles={styles.changeButton}
          textStyles={{ color: colors.primary }}
        />
      )}
    </View>
  );
};
