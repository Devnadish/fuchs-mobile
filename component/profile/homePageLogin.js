import {
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "../../constants";
import { StyleSheet } from "react-native";
import { borderRadius } from "../../styles/globalStyle";

export const profileButtons = [
  {
    id: 1,
    name: "person",
    href: "/(profile)/profile",
    icon: <FontAwesome5 name="user-alt" size={20} color={colors.muteColor} />,
    title: "Profile",
    decription: "will help us to send you our offers and Gifts",
  },
  {
    id: 2,
    name: "city",
    href: "/(profile)/city",
    icon: (
      <MaterialCommunityIcons name="city" size={24} color={colors.muteColor} />
    ),
    title: "select your City",
    decription: "will show our branch and Services in your city",
  },
  {
    id: 3,
    name: "car",
    href: "/(profile)/car",
    icon: <FontAwesome5 name="car" size={24} color={colors.muteColor} />,
    title: "select your Car",
    decription: "enable fast speed and easy booking and more",
  },

  {
    id: 4,
    name: "setting",
    href: "/(profile)/profile",
    icon: <Ionicons name="settings" size={20} color={colors.muteColor} />,
    title: "Setting",
    decription: "select theme and language and more",
  },
];

export const activityButtons = [
  {
    id: 3,
    name: "booking",
    href: "/(profile)/profile",
    icon: (
      <FontAwesome name="calendar-check-o" size={24} color={colors.muteColor} />
    ),
    title: "Active Booking",
    decription: "Check your active booking and more",
  },
  {
    id: 1,
    name: "Favorite Branches",
    href: "/(profile)/profile",
    icon: <Fontisto name="heart" size={20} color={colors.muteColor} />,
    title: "Favorite Branches",
    decription: "Favorite Branches ",
  },
  {
    id: 2,
    name: "pind offer",
    href: "/(profile)/profile",
    icon: <Fontisto name="pinboard" size={20} color={colors.muteColor} />,
    title: "Pind offer",
    decription: "pind offer you like",
  },
];

export const otherButtons = [
  {
    id: 1,
    name: "logout",
    href: "/(profile)/logout",
    icon: <MaterialIcons name="logout" size={20} color={colors.danger} />,
    title: "Logout",
    decription: "will log you out of your account",
  },
];

export const styles = StyleSheet.create({
  titleText: { fontSize: 14, color: colors.textColor },
  decriptionText: {
    fontWeight: "light",
    color: colors.muteColor,
    fontSize: 12,
  },
  menuContainer: {
    width: "100%",
    backgroundColor: colors.white,
    gap: 10,
    padding: 10,
    borderRadius: borderRadius,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    height: 50,
    backgroundColor: colors.white,
    alignItems: "center",
    // justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 20,
    backgroundColor: colors.backgroundColor,
  },
});
