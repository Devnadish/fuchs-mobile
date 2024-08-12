import { ScrollView, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import FormContainer from "../shared/FormContainer";
import Input from "../shared/Input";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../../constants";
import UserImage from "../auth/UserImage";

import { updateUserProfile } from "../../api/updateUserProvider";
import Btn from "../shared/Btn";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { uploadImageToCloudnary } from "../../util/uploadImageToCloudnary";
import { globalStyle } from "../../styles/globalStyle";
import SelectCity from "./SelectCity";

export default function ProfileData({
  name,
  email,
  mobile,
  password,
  city,
  avatar,
}) {
  const [newPassWord, setNewPassWord] = useState(password);
  const [errorMsg, setErrorMsg] = useState(null);
  const [newName, setNewName] = useState(name);
  const [newMobile, setNewMobile] = useState(mobile);
  const [newEmail, setNewEmail] = useState(email);
  const [newCity, setNewCity] = useState(city || "Select Your City");
  const [loading, setLoading] = useState(false);
  const [newAvatar, setnewAvatar] = useState(
    process.env.EXPO_PUBLIC_CLOUDINARY_ENDPOINT + avatar
  );
  const { updateProfile } = useContext(userAuthContext);
  const handleUpdate = async () => {
    setLoading(true);
    //TODO: add validation

    let imagePublicId;
    try {
      imagePublicId = await uploadImageToCloudnary(
        newAvatar,
        "oneStopUserAvatar", // cloudainary preset name
        "userAvatar"
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    const userInformation = {
      name: newName,
      mobile: newMobile,
      email: newEmail,
      password: newPassWord,
      city: newCity,
      avatar: imagePublicId.public_id || avatar,
    };

    const updateUser = await updateUserProfile(userInformation);
    await updateProfile(userInformation); // update user context
    setLoading(false);
  };

  return (
    // <View style={globalStyle.container}>
    <ScrollView
      contentContainerStyle={globalStyle.scroll}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.avatarContainer}>
        <UserImage userAvatar={newAvatar} setuserAvatar={setnewAvatar} />
      </View>
      <FormContainer
        title={"Edit Profile"}
        icon={<Feather name="edit" size={24} color={colors.muteColor} />}
      >
        {/* {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>} */}
        <Input
          label="Name"
          placeholder="Enter Name"
          text={newName}
          setText={setNewName}
          validationMsg="Enter Valid Name"
          reqierd
        />
        <Input
          label="Mobile"
          placeholder="Enter Mobile"
          text={newMobile}
          setText={setNewMobile}
          reqierd
          keyboardType="numeric"
          maxLength={10}
        />
        <Input
          label="E-mail"
          placeholder="Enter Email"
          text={newEmail}
          setText={setNewEmail}
          reqierd
        />

        <Input
          label="Password"
          placeholder="Enter Password"
          text={newPassWord}
          setText={setNewPassWord}
          reqierd
          maxLength={10}
        />
      </FormContainer>
      <SelectCity selectedValue={newCity} setSelectedValue={setNewCity} />
      <View style={styles.footer}>
        <Btn
          title="Update Profile"
          handlePress={() => {
            handleUpdate();
          }}
          isLoading={loading}
          loadingText="Update  Profile"
          containerStyles={{ backgroundColor: colors.danger }}
        />
      </View>
    </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  footer: {
    marginBottom: 20,
    alignItems: "center",
    height: 60,
  },
});
