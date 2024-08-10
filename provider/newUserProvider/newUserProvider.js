import { createContext, useState } from "react";

const newUserContext = createContext(null);

const NewUserProvider = ({ children }) => {
  const [userAvatar, setuserAvatar] = useState(null);

  return (
    <newUserContext.Provider
      value={{
        userAvatar,
        setuserAvatar,
      }}
    >
      {children}
    </newUserContext.Provider>
  );
};

export { NewUserProvider, newUserContext };
