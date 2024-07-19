import { View, Text, Image } from "react-native";
import React from "react";

export default function ServiceCard({ location }) {
  return (
    <View className="w-[90%]   rounded-lg p-2 h-[150px] bg-card shadow-2xl flex-row">
      <View className="w-1/2 border">
        <Text className="text-foreground text-xl font-semibold">
          ServiceCard.
        </Text>
        <Text className="text-foreground text-xl font-semibold">
          {location?.altitude}
        </Text>
      </View>
      <View className="w-1/2 aspect-[4/3]  ">
        <Image
          source={require("../../assets/images/service/oilChange.png")}
          resizeMode="cover"
          className="w-full h-full rounded-lg"
        />
      </View>
    </View>
  );
}
