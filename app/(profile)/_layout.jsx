import React, { useContext } from "react";
import { Tabs } from "expo-router";
import { colors } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import GoHome from "../../component/shared/GoHome";
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: colors.linkColor,
        headerStyle: {
          backgroundColor: colors.primary,
        },

        headerRight: () => <GoHome />,
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="user-alt"
              size={focused ? 28 : 24}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="car"
        options={{
          tabBarLabel: "Car",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="car"
              size={focused ? 28 : 24}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="selectcar"
        options={{
          title: "Car",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="car"
              size={focused ? 28 : 24}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="settings"
              size={focused ? 28 : 24}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
