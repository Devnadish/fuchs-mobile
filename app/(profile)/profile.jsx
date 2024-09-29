import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import { getUserByMobile } from "@api/getUserByMobile";
import { colors } from "@constants";
import { borderRadius } from "@styles/globalStyle";
import Input from "@component/shared/Input";
import Btn from "@component/shared/Btn";
import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { UPDATE_USER_PROFILE_DATA } from "@api/updateUserProfile";
import { showToast } from "@lib/nadish";
import ProfileInstraction from "@component/instraction/ProfileInstraction";
import SaveAndCancel from "@component/shared/SaveAndCancel";

export default function Profile() {
  const { userName: contextuserName, userEmail } = useUserAuth();
  const [updateLoading, setUpdateLoading] = useState(false);
  const { userMobile, updateProfile } = useUserAuth();
  const [userName, setUserName] = useState(contextuserName);
  const [email, setEmail] = useState(userEmail);

  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const userInformation = {
        mobile: userMobile,
        name: userName,
        email: email,
      };
      const updateData = await UPDATE_USER_PROFILE_DATA(userInformation);
      if (updateData) {
        await updateProfile({ userName: userName, userEmail: email });
        showToast("Profile updated successfully");
        setTimeout(() => router.back(), 2000);
      }
      setUpdateLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{ title: `Profile ${userMobile}`, headerShown: true }}
      />
      <View style={styles.container}>
        <ProfileInstraction />
        <View style={styles.formContainer}>
          <Input
            label="Name"
            placeholder="Enter Name"
            text={userName}
            setText={setUserName}
            validationMsg="Enter Valid Name"
            required
            maxLength={150}
            icon={<Feather name="user" size={20} color={colors.muteColor} />}
          />
          <Input
            label="E-mail"
            placeholder="Enter Email"
            text={email}
            setText={setEmail}
            required
            icon={<Feather name="mail" size={20} color={colors.muteColor} />}
          />
        </View>
        <View>
          <SaveAndCancel handleSubmit={handleUpdate} indcator={updateLoading} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 20,
  },
  formContainer: {
    width: "100%",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    borderRadius: borderRadius,
  },
});
