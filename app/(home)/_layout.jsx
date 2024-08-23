import { Image, Platform, Text, View } from "react-native";
import React, { useContext } from "react";
import { Tabs } from "expo-router";
import { colors } from "../../constants";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Homepage } from "../../constants/headerBarStyle";
import ActiveBooking from "../../component/home/ActiveBookin";
import UserAvatar from "../../component/home/UserAvatar";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { LOGO_IMAGE, ONESTOP } from "../../constants/images";

const TabsLayout = () => {
  const { t } = useTranslation();
  return (
    <Tabs
      // initialRouteName="branches"
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: colors.linkColor,

        // headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.backgroundColor,
        },

        headerTitle: () => (
          <Image
            source={{
              uri: process.env.EXPO_PUBLIC_CLOUDINARY_ENDPOINT + ONESTOP,
            }}
            style={{ width: 60, height: 40 }}
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
        name="Booking"
        options={{
          title: t("tab.booking"),
          headerTitle: null,
          tabBarLabel: () => {
            return null;
          },
          // headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <>
              <FontAwesome6
                name="calendar-plus"
                size={focused ? 28 : 24}
                color={focused ? colors.danger : colors.primary}
              />
              <Text style={{ color: focused ? colors.danger : colors.primary }}>
                Book
              </Text>
            </>
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

{
  /* ; */
}

// screenOptions={{
//         tabBarActiveTintColor: colors.activeIcon,
//         tabBarInactiveTintColor: colors.unActiveIcon,
//         tabBarShowLabel: true,
//         tabBarStyle: {
//           backgroundColor: colors.backgroundColor,
//           borderTopWidth: 1,
//           borderTopColor: colors.activeIcon,
//           height: 54,
//           position: "absolute",
//           bottom: 0,
//           right: 0,
//           left: 0,
//           elevation: 0,
//           height: Platform.OS === "ios" ? 90 : 60,
//         },
