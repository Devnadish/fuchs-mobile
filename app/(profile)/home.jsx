import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  activityButtons,
  otherButtons,
  profileButtons,
  styles,
} from "../../component/profile/homePageLogin";
import { colors } from "../../constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { globalStyle } from "../../styles/globalStyle";
import UserImage from "../../component/profile/profileImage/UserImage";
import { router } from "expo-router";

export default function home() {
  return (
    <ScrollView
      contentContainerStyle={globalStyle.scroll}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <UserImage />
      <View style={styles.container}>
        <MenuItem menu={activityButtons} title={"Activity "} />
        <MenuItem menu={profileButtons} title={"Profile"} />
        <MenuItem menu={otherButtons} title={""} />
      </View>
    </ScrollView>
  );
}
const MenuItem = ({ menu, title }) => {
  return (
    <View>
      <Text
        style={[styles.titleText, { fontWeight: "bold", marginBottom: 10 }]}
      >
        {title}
      </Text>
      <View style={styles.menuContainer}>
        {menu.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            activeOpacity={0.5}
            onPress={() => router.push(item.href)}
          >
            <>
              <View style={{ marginRight: 10 }}>{item.icon}</View>
              <View>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.decriptionText}>{item.decription}</Text>
              </View>
              <View style={{ marginLeft: "auto" }}>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={14}
                  color={colors.muteColor}
                />
              </View>
            </>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
