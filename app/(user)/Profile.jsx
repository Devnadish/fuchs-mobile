import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../../components/shared/Input";
import { colors } from "../../constants";
import Btn from "../../components/shared/Btn";
import * as ImagePicker from "expo-image-picker";
import { AdvancedImage, upload } from "cloudinary-react-native";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from "../../util/cloudinary";
import axios from "axios";

// res.cloudinary.com/dhyh7aufp/image/upload/v1719764934/careco/userCarImage/w5hj8uolk5ss76l0qqj4.png

// Create a Cloudinary instance and set your cloud name.

export default function Profile() {
  const [imagePublicId, setImagePublicId] = useState(null);
  const myImage = cld.image("oneStop/users/avatar/gtczrd103ifkktxqv1hx");
  // Apply the transformation.
  myImage
    .resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))) // Crop the image, focusing on the face.
    .roundCorners(byRadius(100)); // Round the corners.

  const { height } = useWindowDimensions();
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const uploadImage = async () => {
    if (!image) {
      return;
    }
    const options = {
      upload_preset: "oneStopUserAvatar",
      tag: "sample",
      unsigned: true,
    };

    await upload(cld, {
      file: image,
      options: options,
      callback: (error, response) => {
        setImagePublicId(response.public_id);
        console.log(error, response);
        //.. handle response
      },
    });
  };

  const addNewUser = async () => {
    const url = "http://192.168.1.3:3000/api/user/register";
    const userData = {
      name: "khalid from mobilxxxxxxxxxxxxxxxx",
      email: "khalid@gmail.com from mobil",
      mobile: "from mobil",
      password: "from mobil",
    };

    const addUserNewuser = await axios
      .post(url, userData)
      .then((response) => {})
      .catch((error) => {
        console.error({ error });
      });
  };

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style={styles.pageContainer}> */}

      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        style={{ flexGrow: 1 }}
      >
        <View style={styles.containerView}>
          <View style={styles.cloudinaryImageContainer}>
            <AdvancedImage cldImg={myImage} style={styles.cloudinaryImage} />
          </View>
          <Btn title="Update" handlePress={uploadImage} />
          <View style={{ gap: 10 }}>
            <View style={styles.imageContainer}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  // resizeMode="contain"
                />
              ) : (
                <Text>No image</Text>
              )}
            </View>
            <Btn title="Change" handlePress={pickImage} />
            <Btn title="adduser" handlePress={addNewUser} />
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            // behavior={Platform.OS === "ios" ? "padding" : undefined}
            behavior="padding"
          >
            <Input label="Name" />
            <Input label="Email" />
            <Input label="Phone" />
          </KeyboardAvoidingView>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Btn title="Update" handlePress={uploadImage} />
            <Btn title="Add Car" />
          </View>
        </View>
      </ScrollView>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 18,
    marginBottom: 10,
  },
  containerView: {
    flex: 1,
    // height: "70%",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    paddingBottom: 20,
  },
  imageContainer: {
    padding: 5,
    width: 110,
    height: 110,
    borderWidth: 1,
    borderRadius: 75,
    borderColor: colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },

  cloudinaryImageContainer: {
    padding: 5,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 75,
    borderColor: colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
  },
  cloudinaryImage: {
    width: 48,
    height: 48,
    borderRadius: 75,
  },
});
