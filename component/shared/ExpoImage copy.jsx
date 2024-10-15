import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { Skeleton } from 'moti/skeleton';
import PropTypes from 'prop-types'; // Import PropTypes
import { SkeletonCommonProps } from '@styles/globalStyle';

const blurhash = 'LKN]Rv%2Tw=w]~RBVZRi};RPxuwH';

const ExpoImage = ({ image, style, fit = 'cover', radius = 4, imageHash }) => {
  const [showSkeleton, setShowSkeleton] = useState(true); // Show skeleton initially
  console.log(imageHash);

  // Prefetch the image
  useEffect(() => {
    const prefetchImage = async () => {
      try {
        await Image.prefetch(image); // Prefetch the image
      } catch (error) {
        console.error('Image prefetch error:', error);
      }
    };

    prefetchImage();
  }, [image]);

  return (
    <>
      <Image
        source={{ uri: image }}
        style={style}
        transition={200}
        contentFit={fit}
        placeholder={{ imageHash }}
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
};

// PropTypes for type checking
ExpoImage.propTypes = {
  image: PropTypes.string.isRequired,
  style: PropTypes.object,
  fit: PropTypes.string,
  radius: PropTypes.number,
};

// Default props

export default ExpoImage;

// import React, { useState } from 'react';
// import { Image } from 'expo-image';
// import { Skeleton } from 'moti/skeleton';
// import PropTypes from 'prop-types'; // Import PropTypes
// import { SkeletonCommonProps } from '@styles/globalStyle';

// const blurhash = 'LKN]Rv%2Tw=w]~RBVZRi};RPxuwH';

// export default function ExpoImage({ image, style, fit = 'cover', radius = 4 }) {
//   const [showSkeleton, setShowSkeleton] = useState(true); // Show skeleton initially

//   return (
//     <>
//       <Image
//         source={{ uri: image }}
//         style={style}
//         transition={200}
//         contentFit={fit}
//         placeholder={{ blurhash }}
//         onLoadEnd={() => {
//           setShowSkeleton(false); // Hide skeleton when image loads
//         }}
//       />
//       {showSkeleton && (
//         <Skeleton
//           show={showSkeleton}
//           style={{
//             ...style,
//             borderRadius: radius, // Explicitly set the border radius
//           }}
//           {...SkeletonCommonProps}
//         />
//       )}
//     </>
//   );
// }

// // Define prop types for ExpoImage component
// // ExpoImage.propTypes = {
// //   image: PropTypes.string.isRequired, // Validate image prop
// //   style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // Validate style prop
// //   fit: PropTypes.oneOf(['cover', 'contain']), // Validate fit prop
// //   radius: PropTypes.number, // Validate radius prop
// // };
