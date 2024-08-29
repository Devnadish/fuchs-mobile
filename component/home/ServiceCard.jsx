import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { globalStyle, shadowStyle } from "../../styles/globalStyle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
const crd = {
  image: "image1",
  title: "title",
  description: "description of service",
  aboutservice: "aboutservice of service card",
  freeService: "freeService of service card",
  rate: "rate",
};

export default function ServiceCard({ id, title, description }) {
  return (
    <View style={styles.cardContainer}>
      <Detail id={id} title={title} description={description} />
      <Actions serviceId={id} />
    </View>
  );
}

const Actions = ({ serviceId }) => {
  console.log({ serviceId });

  const handlePressBooking = () => {
    router.push({
      pathname: "/(screens)/booking",
      params: { serviceId: serviceId },
    });
  };
  const handlePressfreeGift = () => {
    router.push({
      pathname: "/(screens)/freegift",
      params: { serviceId: serviceId },
    });
  };

  const handleInfo = () => {
    router.push({
      pathname: "/(screens)/serviceInfo",
      params: { serviceId: serviceId },
    });
  };

  const handlePressServiceRate = () => {
    console.log("info");
    router.push({
      pathname: "/(screens)/serviceRateInfo",
      params: { serviceId: serviceId },
    });
  };
  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity
        onPress={handlePressBooking}
        activeOpacity={0.7}
        style={styles.touchable}
      >
        <View style={styles.Bookingcontainer}>
          <FontAwesome name="calendar-plus-o" size={24} color={colors.white} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleInfo}
        activeOpacity={0.7}
        style={styles.touchable}
      >
        <View style={styles.moreAction}>
          <Entypo name="info" size={24} color={colors.primaryBtn} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePressfreeGift}
        activeOpacity={0.7}
        style={styles.touchable}
      >
        <View style={styles.moreAction}>
          <FontAwesome name="gift" size={24} color={colors.primaryBtn} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressServiceRate}
        activeOpacity={0.7}
        style={styles.touchable}
      >
        <View style={styles.moreAction}>
          <MaterialIcons name="star-rate" size={24} color={colors.primaryBtn} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const Detail = ({ id, title, description }) => {
  return (
    <View style={styles.detailContainer}>
      <Text style={globalStyle.titleText}>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.backgroundColor,
    width: "100%",
    borderRadius: 10,
    ...shadowStyle,
  },
  touchable: {},
  Bookingcontainer: {
    width: 100,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.primary,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    // ...shadowStyle,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  moreAction: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.white,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    // alignItems: "center",
    width: "100%",
    height: 150,
    // backgroundColor: colors.primary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 2 / 1,
  },
  detailContainer: {
    padding: 10,
  },
});
