// import { Image } from "expo-image";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { globalStyle } from "../../styles/globalStyle";
import ExpoImage from "../shared/ExpoImage";

const UserImage = ({ userAvatar, setuserAvatar }) => {
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

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", padding: 10 }}
    >
      <View style={styles.imageContainer}>
        {!userAvatar ? (
          <FontAwesome name="user-circle" size={120} color={colors.muteColor} />
        ) : (
          <ExpoImage image={userAvatar} style={styles.image} />
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
