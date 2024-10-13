import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const newUserContext = createContext(null);

const NewUserProvider = ({ children }) => {
  const [userAvatar, setUserAvatar] = useState(null); // Corrected casing for setUserAvatar

  return (
    <newUserContext.Provider
      value={{
        userAvatar,
        setUserAvatar, // Corrected casing for setUserAvatar
      }}>
      {children}
    </newUserContext.Provider>
  );
};

// // PropTypes validation for NewUserProvider
// NewUserProvider.propTypes = {
//   children: PropTypes.node.isRequired, // Validate that children is a node and is required
// };

export { NewUserProvider, newUserContext };
