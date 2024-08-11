import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import FormContainer from "../shared/FormContainer";
import Input from "../shared/Input";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../../constants";
import UserImage from "../auth/UserImage";
import { enCitys } from "../../constants/City";
import ShowModal from "../shared/ShowModal";
import { Entypo } from "@expo/vector-icons";
import { updateUserProfile } from "../../api/updateUserProvider";
import Btn from "../shared/Btn";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { uploadImageToCloudnary } from "../../util/uploadImageToCloudnary";

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
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <UserImage userAvatar={newAvatar} setuserAvatar={setnewAvatar} />
      </View>
      <FormContainer
        title={"Edit Profile"}
        icon={<Feather name="edit" size={24} color="black" />}
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
    </View>
  );
}

const SelectCity = ({ selectedValue, setSelectedValue }) => {
  const [visible, setVisible] = useState(false);

  const memoriedCallBack = useCallback((item) => {
    setSelectedValue(item.label);
    setVisible(false);
  }, []);

  const RenderItem = memo(({ item, handleOnPressItem }) => {
    return (
      <Pressable
        onPress={() => handleOnPressItem(item)}
        style={styles.pressapleContainer}
      >
        <View style={styles.pressaple}>
          <Text style={styles.whyText}>{item.label}</Text>
        </View>
      </Pressable>
    );
  });

  return (
    <FormContainer
      title={"Change City"}
      icon={<Feather name="edit" size={24} color="black" />}
    >
      <Pressable onPress={() => setVisible(true)} style={styles.pressTochange}>
        <Text>{selectedValue}</Text>
        <Entypo name="select-arrows" size={24} color={colors.muteColor} />
      </Pressable>
      <ShowModal
        visible={visible}
        setVisible={setVisible}
        header={"Selct Your City"}
      >
        <View style={{ marginBottom: 30 }}>
          <FlatList
            data={enCitys}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RenderItem item={item} handleOnPressItem={memoriedCallBack} />
            )}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </ShowModal>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  pressTochange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  pressaple: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.backgroundColor,
  },
  pressapleContainer: {
    width: "100%",
  },
  contentContainer: {
    backgroundColor: colors.backgroundColor,
    padding: 10,
  },
  itemStyle: {
    height: 50, // Set the desired height for the items
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    height: 40,
    backgroundColor: colors.backgroundColor,
    borderRadius: 8,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  loginButton: {
    backgroundColor: colors.danger,
    padding: 10,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  closeButton: {
    backgroundColor: colors.danger,
    padding: 10,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
