import React from "react";
import FastImage from "react-native-fast-image";

export default function ShowFastImage({ imgUrl }) {
  return (
    <FastImage
      style={{ width: 200, height: 200 }}
      source={{
        uri: imgUrl,
        // headers: { Authorization: "someAuthToken" },
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
}
