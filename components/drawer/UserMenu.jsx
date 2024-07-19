import { View, Text, Image } from "react-native";
import React from "react";
import { colors } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Zocial } from "@expo/vector-icons";

export default function UserMenu({ userName, userAvatar }) {
  const callProfile = () => {
    router.push("/(user)/Profile");
  };
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <View>
        <Text style={{ color: colors.black, fontWeight: "bold", fontSize: 14 }}>
          Welcome
        </Text>
        <Text style={{ color: colors.black, fontSize: 14 }}>{userName}</Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.primary,
          // padding: 5,
          height: 45,
          width: 45,
          alignSelf: "start",
          marginRight: 10,
          borderRadius: 50,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            callProfile();
          }}
        >
          <Image
            source={require("../../assets/images/service/oneStop.png")}
            style={{ width: 38, height: 38 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function GustMenu({ userName }) {
  const callProfile = () => {
    router.push("/(user)/Profile");
  };
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <View>
        <Text>Welcome</Text>
        <Text style={{ color: colors.black, fontSize: 14 }}>
          Guest Register
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.primary,
          // padding: 5,
          height: 45,
          width: 45,
          alignSelf: "start",
          marginRight: 10,
          borderRadius: 50,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            callProfile();
          }}
        >
          <Zocial name="guest" size={34} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
