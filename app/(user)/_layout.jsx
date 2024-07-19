import { View, Text, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { colors } from "../../constants";

import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function Userlayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.activeIcon,
        tabBarInactiveTintColor: colors.unActiveIcon,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
          borderTopWidth: 1,
          borderTopColor: colors.activeIcon,
          height: 54,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: Platform.OS === "ios" ? 90 : 60,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="user" size={focused ? 28 : 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="UserBooking"
        options={{
          title: "UserBooking",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="calendar-multiple"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Notification"
        options={{
          title: "Notification",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="notifications-none"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Transaction"
        options={{
          title: "Transaction",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Octicons name="history" size={focused ? 28 : 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cars"
        options={{
          title: "Car",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="car-outline"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
