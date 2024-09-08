import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { getUserByMobile } from "../../api/getUserByMobile";
import { colors } from "../../constants";
import { borderRadius } from "../../styles/globalStyle";
import Input from "../../component/shared/Input";
import Btn from "../../component/shared/Btn";
import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { UPDATE_USER_PROFILE_DATA } from "../../api/updateUserProfile";
import { showToast } from "../../lib/nadish";
import ProfileInstraction from "../../component/instraction/ProfileInstraction";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { userMobile, updateUserProfile } = useContext(userAuthContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const data = await getUserByMobile({ mobile: userMobile });
        if (data) {
          setUserName(data.name);
          setEmail(data.email);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userMobile]);

  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const userInformation = {
        mobile: userMobile,
        name: userName,
        email: email,
      };
      const updateData = await UPDATE_USER_PROFILE_DATA(userInformation);
      await updateUserProfile(userName, email); // Update user context
      showToast("Profile updated successfully");
      setUpdateLoading(false);

      setTimeout(() => router.back(), 2000);
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
        {loading && (
          <ActivityIndicator
            animating={loading}
            color={colors.primary}
            size="large"
          />
        )}
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
          <Btn
            title="Update Profile"
            handlePress={handleUpdate}
            isLoading={updateLoading}
            loadingText="Updating Profile"
            containerStyles={{
              backgroundColor: colors.danger,
              width: "80%",
              marginTop: 20,
            }}
          />
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
