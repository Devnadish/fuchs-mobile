import React, { useState } from "react";
import { Button } from "react-native";
import { ImagePicker } from "expo-image-picker";

const FirstPage = ({ navigation }) => {
  const [imageBlob, setImageBlob] = useState(null);

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      setImageBlob(blob);

      navigation.navigate("SecondPage", {
        imageDataUrl: URL.createObjectURL(blob),
      });
    }
  };

  return <Button title="Select Image" onPress={handleImageSelection} />;
};

export default FirstPage;



import React from 'react';
import { Image } from 'react-native';

const SecondPage = ({ route }) => {
  const { imageDataUrl } = route.params;

  return (
    <Image source={{ uri: imageDataUrl }} style={{ width: 200, height: 200 }} />
  );
};

export SecondPage;

