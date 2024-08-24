import React from "react";
import { Image } from "expo-image";
const blurhash = "LYLWbgui7e:5V?I:aMbIZ|I.Rknn";
export default function ExpoImage({ image, style }) {
  return (
    <Image
      source={{ uri: image }}
      style={style}
      transition={200}
      contentFit="cover"
      placeholder={{ blurhash }}
    />
  );
}
