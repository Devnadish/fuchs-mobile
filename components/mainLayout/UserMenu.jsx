import { View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../constants";

export default function UserMenu() {
  return (
    <View className="w-7 h-7 rounded-full bg-gray-400 items-center justify-center">
      <TouchableOpacity onPress={() => {}}>
        <FontAwesome name="user-circle" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}
