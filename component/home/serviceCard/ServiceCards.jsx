import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { borderRadius, globalStyle } from "@styles/globalStyle";

const ServiceCards = React.memo(
  ({ id, title, description, userLanguage, rate }) => {
    return (
      <View style={styles.cardContainer}>
        <Detail title={title} description={description} />
        <Actions serviceId={id} userLanguage={userLanguage} rate={rate} />
      </View>
    );
  }
);

const Actions = ({ serviceId, userLanguage, rate }) => {
  const handleNavigation = useCallback((path, params) => {
    router.push({ pathname: path, params });
  }, []);

  return (
    <View style={styles.actionContainer}>
      <ActionButton
        onPress={() =>
          handleNavigation("/(screens)/serviceAction/bookAppointment", {
            serviceId,
          })
        }
        icon={
          <FontAwesome name="calendar-plus-o" size={24} color={colors.white} />
        }
        style={styles.bookingContainer}
      />
      <ActionButton
        onPress={() =>
          handleNavigation("/(screens)/serviceAction/serviceInfo", {
            serviceId,
            userLanguage,
          })
        }
        icon={<Entypo name="info" size={24} color={colors.primaryBtn} />}
      />
      <ActionButton
        onPress={() =>
          handleNavigation("/(screens)/serviceAction/freegift", {
            serviceId,
            userLanguage,
          })
        }
        icon={<FontAwesome name="gift" size={24} color={colors.primaryBtn} />}
      />
      <ActionButton
        onPress={() =>
          handleNavigation("/(screens)/serviceAction/serviceRate", {
            serviceId,
            userLanguage,
          })
        }
        icon={
          <View style={styles.rateContainer}>
            <MaterialIcons name="star-rate" size={24} color={colors.yellow} />
            <Text style={styles.rateText}>{rate}</Text>
          </View>
        }
      />
    </View>
  );
};

const ActionButton = ({ onPress, icon, style }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={[styles.touchable, style]}
  >
    {icon}
  </TouchableOpacity>
);

const Detail = ({ title, description }) => (
  <View style={styles.detailContainer}>
    <Text style={globalStyle.titleText}>{title}</Text>
    <Text>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: colors.muteColor,
    borderRadius: borderRadius,
  },
  touchable: {},
  bookingContainer: {
    width: 100,
    height: 48,
    borderRadius: borderRadius,
    backgroundColor: colors.primary,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rateText: {
    marginLeft: 1,
    color: colors.muteColor,
    fontSize: 12,
  },
  detailContainer: {
    padding: 10,
  },
});

export default ServiceCards;
