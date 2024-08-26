import React, { useContext } from "react";
import { Tabs } from "expo-router";
import { colors } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import GoHome from "../../component/shared/GoHome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";

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

        headerLeft: () => <GoHome />,
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="user-alt"
              size={focused ? 24 : 24}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="car"
        options={{
          title: "Modify Your Car",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="car"
              size={focused ? 24 : 20}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favBranches"
        options={{
          title: "Favorite Branches ",
          tabBarIcon: ({ color, focused }) => (
            <Fontisto
              name="heart"
              size={focused ? 24 : 20}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pinOffers"
        options={{
          title: "Offers you like",
          tabBarIcon: ({ color, focused }) => (
            <Fontisto
              name="pinboard"
              size={focused ? 24 : 20}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="settings"
              size={focused ? 24 : 20}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="logout"
        options={{
          title: "Logout",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="logout" size={24} color={colors.primary} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
