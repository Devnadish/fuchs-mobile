import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { userAuthContext } from "../../provider/userAuth/userAuthProvider";

const HomePage = () => {
  const { userName, userEmail, userAvatar } = useContext(userAuthContext);

  return (
    // <Text>{language}</Text>

    <View>
      <TouchableOpacity
        onPress={() => {
          setShow(true);
        }}
      >
        <Text>{userName} </Text>
        <Text>{userEmail} </Text>
        <Text>{userAvatar} </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
