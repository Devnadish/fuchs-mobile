import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../../constants";

const AddImage = ({ image, setImage }) => {
  const pickImage = async () => {
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
  return (
    <View style={styles.imageContainer}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
          onPress={pickImage}
        />
      ) : (
        <FontAwesome
          name="user-circle"
          size={100}
          color="black"
          onPress={pickImage}
        />
      )}
    </View>
  );
};
export default AddImage;

const styles = StyleSheet.create({
  imageContainer: {
    padding: 5,
    width: 120,
    height: 120,
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
});
