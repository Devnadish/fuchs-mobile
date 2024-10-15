import React, { useState } from 'react';
import { Image } from 'expo-image';
import PropTypes from 'prop-types'; // Import PropTypes

const defaultBlurhash = 'LKN]Rv%2Tw=w]~RBVZRi};RPxuwH'; // Default blurhash

const ExpoImage = ({ image, style, fit = 'cover', radius = 4, imageHash }) => {
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(false); // Track image loading errors

  return (
    <>
      <Image
        source={{ uri: image }}
        style={style}
        transition={200}
        contentFit={fit}
        placeholder={{ imageHash: imageHash || defaultBlurhash }} // Use provided hash or default
        // onLoadEnd={() => {
        //   setIsLoading(false); // Set loading to false when image loads
        // }}
        // onError={() => {
        //   setError(true); // Set error state if image fails to load
        //   setIsLoading(false); // Also stop loading
        // }}
      />
      {/* {isLoading && !error && (
        <Image
          source={{ uri: imageHash || defaultBlurhash }} // Show blurhash if image is loading
          style={{
            ...style,
            borderRadius: radius, // Explicitly set the border radius
          }}
        />
      )}
      {error && (
        <Image
          source={{ uri: defaultBlurhash }} // Show default blurhash on error
          style={{
            ...style,
            borderRadius: radius, // Explicitly set the border radius
          }}
        />
      )} */}
    </>
  );
};

// PropTypes for type checking
ExpoImage.propTypes = {
  image: PropTypes.string.isRequired,
  style: PropTypes.object,
  fit: PropTypes.string,
  radius: PropTypes.number,
  imageHash: PropTypes.string,
};

export default ExpoImage;
