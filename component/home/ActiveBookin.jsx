import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "../../constants";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";

export default function ActiveBooking() {
  const [active, setActive] = useState(true);
  const { logout } = useContext(userAuthContext);
  return (
    <View style={styles.container}>
      <Text onPress={logout}>logout</Text>
      {active ? (
        <FontAwesome name="calendar-check-o" size={24} color={colors.danger} />
      ) : (
        <FontAwesome
          name="calendar-plus-o"
          size={24}
          color={colors.primaryBtn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.muteColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
