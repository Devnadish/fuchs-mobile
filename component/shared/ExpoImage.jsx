import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import { Skeleton } from "moti/skeleton";
import { colors } from "../../constants";
import { SkeletonCommonProps } from "../../styles/globalStyle";

const blurhash = "LKN]Rv%2Tw=w]~RBVZRi};RPxuwH";

export default function ExpoImage({ image, style, fit = "cover", radius = 4 }) {
  const [showSkeleton, setShowSkeleton] = useState(false);

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
          show={showSkeleton}
          style={{
            ...style,
            borderRadius: radius, // Explicitly set the border radius
          }}
          {...SkeletonCommonProps}
        />
      )}
    </>
  );
}
