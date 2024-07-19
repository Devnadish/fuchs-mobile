import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants";

export default function MainMenu() {
  return (
    <View className="w-7 h-7 rounded-full bg-white">
      <TouchableOpacity onPress={() => {}}>
        <MaterialCommunityIcons name="menu" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}
