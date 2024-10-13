import React, { createContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Text } from 'react-native';

const UserLocationContext = createContext(null);

const UserLocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      {children}
      {errorMsg && <Text>{errorMsg}</Text>} {/* Display error message if it exists */}
    </UserLocationContext.Provider>
  );
};

// PropTypes validation for UserLocationProvider
// UserLocationProvider.propTypes = {
//   children: PropTypes.node.isRequired, // Validate that children is a node and is required
// };

export { UserLocationProvider, UserLocationContext };
