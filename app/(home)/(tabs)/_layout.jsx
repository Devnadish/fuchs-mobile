import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { colors } from "../../../constants";

import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { UserLocationProvider } from "../../../provider/UserLocationProvider/UserLocationProvider";
import { useTranslation } from "react-i18next";

const TabsLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* <NavBar /> */}
      <UserLocationProvider>
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
            name="home"
            options={{
              title: t("tab.home"),
              headerShown: false,
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
              headerShown: false,
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
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: colors.primary,
                    backgroundColor: colors.primary,
                    borderRadius: 5,
                    width: 70,
                    height: 70,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 20,
                  }}
                >
                  <FontAwesome6
                    name="calendar-plus"
                    size={focused ? 28 : 24}
                    color={focused ? colors.danger : colors.white}
                  />
                  <Text
                    style={{ color: focused ? colors.danger : colors.white }}
                  >
                    Book
                  </Text>
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="offers"
            options={{
              title: t("tab.offers"),
              headerShown: false,
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
              headerShown: false,
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
      </UserLocationProvider>
    </>
  );
};

export default TabsLayout;

{
  /* ; */
}