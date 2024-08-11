// import { Image } from "expo-image";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";

const UserImage = ({ userAvatar, setuserAvatar }) => {
  // const [image, setImage] = useState(
  //   process.env.EXPO_PUBLIC_CLOUDINARY_ENDPOINT + userAvatar
  // );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setuserAvatar(result.assets[0].uri);

      // setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!userAvatar ? (
          <FontAwesome name="user-circle" size={120} color={colors.muteColor} />
        ) : (
          <Image style={styles.image} source={{ uri: userAvatar }} />
        )}
      </View>
      <Pressable onPress={pickImage} style={styles.changeButon}>
        <Text style={styles.changeText}>Change</Text>
      </Pressable>
    </View>
  );
};
export default UserImage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundColor,
    width: "100%",
    padding: 10,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderColor: colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 75,
    backgroundColor: colors.primary,
  },

  changeButon: {
    alignItems: "center",
  },
  changeText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.primary,
  },
});
