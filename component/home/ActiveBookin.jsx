import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "../../constants";
import { useUserAuth } from "../../provider/userAuth/userAuthProvider";
import TextLink from "../shared/TextLink";
import { router } from "expo-router";

export default function ActiveBooking() {
  const [active, setActive] = useState(true);
  const { userMobile } = useUserAuth();
  if (userMobile === "Gust") {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          gap: 3,
        }}
      >
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text style={{ color: colors.primary }}>Login</Text>
        </TouchableOpacity>
        <Text>/</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={{ color: colors.green }}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.booking}>
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
  booking: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.muteColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
