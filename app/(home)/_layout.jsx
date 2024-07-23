import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Drawer } from "expo-router/drawer";
import { colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import UserMenu, { GustMenu } from "../../components/drawer/UserMenu";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const DrawerMenu = ({ isLogin, ...props }) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{
          backgroundColor: "#dde3fe",
        }}
      >
        <View
          style={{
            padding: 20,
            paddingTop: 10 + top,
            paddingBottom: 10 + top,
            backgroundColor: colors.primary,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBlockColor: "black",
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderColor: colors.white,
              padding: 5,
              width: 120,
              alignSelf: "center",
              height: 70,
              borderRadius: 5,
              backgroundColor: colors.white,
            }}
          >
            <Image
              source={require("../../assets/images/service/oneStop.png")}
              style={{ width: 150, height: 50, alignSelf: "center" }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={{ backgroundColor: colors.white, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          borderTopColor: colors.primary,
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,

          backgroundColor: colors.white,

          justifyContent: "flex-end",
          alignItems: "flex-center",
          flexDirection: "row",
          gap: 10,
        }}
      >
        {isLogin ? <LogOutBtn /> : <RegisterBtn />}
      </View>
    </View>
  );
};

export default function DrawerLayout() {
  const { isLogin, userName, userAvatar } = useContext(userAuthContext);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <DrawerMenu
            {...props}
            isLogin={isLogin}
            userName={userName}
            userAvatar={userAvatar}
          />
        )}
        // useSafeArea={true}
        // headerleft:{() => {
        //   return <Text>Text</Text>;
        // }}

        screenOptions={{
          headerRight: () =>
            isLogin ? (
              <UserMenu userName={userName} userAvatar={userAvatar} />
            ) : (
              <GustMenu />
            ),
          // drawerHideStatusBarOnOpen: true,
          drawerActiveBackgroundColor: "#5363df",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            marginLeft: -25,
            fontSize: 15,
          },
          // drawerStyle: {
          //   width: 240,
          // },
          headerStyle: {
            // backgroundColor: colors.primary,
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          // component={Home}
          options={{
            title: "Home Page",
            headerTitle: "Home",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Review"
          options={{
            title: "Review",
            headerTitle: "Latest News",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="staro" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="LatestNews"
          options={{
            title: "Latest News",
            headerTitle: "Latest News",
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="newspaper-variant-multiple"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Faq"
          options={{
            title: "FAQ",
            headerTitle: "FAQ",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="questioncircleo" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Setting"
          options={{
            headerTitle: "الاعدادات",
            drawerIcon: ({ size, color }) => (
              <SimpleLineIcons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const RegisterBtn = () => {
  const handlePress = () => {
    router.push("/(auth)/register");
  };
  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "flex-end",
        }}
      >
        <Text style={{ fontWeight: "semibold", fontSize: 14 }}>register</Text>
        <FontAwesome5 name="user-plus" size={24} color="black" />
      </TouchableOpacity>
    </>
  );
};
const LogOutBtn = () => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "flex-end",
        }}
      >
        <Text style={{ fontWeight: "semibold", fontSize: 14 }}>Logout</Text>
        <MaterialIcons name="logout" size={24} color="black" />
      </View>
    </>
  );
};
