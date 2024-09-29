import React from "react";
import { Tabs } from "expo-router";
import { colors } from "@constants";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Homepage } from "@constants/headerBarStyle";
import ActiveBooking from "@component/home/ActiveBookin";
import UserAvatar from "@component/home/UserAvatar";
import { ONESTOP } from "@constants/images";
import ExpoImage from "@component/shared/ExpoImage";

const TabsLayout = () => {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: colors.linkColor,
        tabBarStyle: { height: 60 },
        headerStyle: {
          backgroundColor: colors.backgroundColor,
        },

        headerTitle: () => (
          <ExpoImage
            image={ONESTOP}
            style={{ width: 60, height: 40 }}
            width={40}
            height={40}
            radius={2}
          />
        ),
        headerRight: () => <ActiveBooking />,
        headerLeft: () => <UserAvatar />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("tab.home"),
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name="home"
              size={focused ? 28 : 24}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="branches"
        options={{
          title: t("tab.branches"),
          // headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="location-dot"
              size={focused ? 28 : 24}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="offers"
        options={{
          title: t("tab.offers"),
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="local-offer"
              size={focused ? 28 : 24}
              color={focused ? colors.danger : colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: t("tab.contact"),
          tabBarIcon: ({ color, focused }) => (
            <Zocial
              name="call"
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
