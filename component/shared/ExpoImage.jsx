import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import { Skeleton } from "moti/skeleton";
import { colors } from "../../constants";

const blurhash = "LYLWbgui7e:5V?I:aMbIZ|I.Rknn";

export default function ExpoImage({ image, style, fit = "cover", radius = 4 }) {
  const [showSkeleton, setShowSkeleton] = useState(false);

  const SkeletonCommonProps = {
    colorMode: "light",
    transition: {
      type: "timing",
      duration: 1500,
    },
    backgroundColor: colors.muteColor,
  };

  return (
    <>
      <Image
        source={{ uri: image }}
        style={style}
        transition={200}
        contentFit={fit}
        placeholder={{ blurhash }}
        onLoadEnd={() => {
          setShowSkeleton(false); // Hide skeleton when image loads
        }}
      />
      {showSkeleton && (
        <Skeleton
          {...SkeletonCommonProps}
          show={showSkeleton}
          style={{
            ...style,
            borderRadius: radius, // Explicitly set the border radius
          }}
        />
      )}
    </>
  );
}
