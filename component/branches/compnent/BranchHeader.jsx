import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@constants";

import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";

const BranchHeader = ({ item }) => {
  const { userLanguage } = useUserAuth();
  return (
    <View style={styles.continer}>
      <CityName item={item} userLanguage={userLanguage} />
      <Drive item={item} />
      <Rateing item={item} />
    </View>
  );
};

const Rateing = ({ item }) => {
  return (
    <View style={styles.ratingIcon}>
      <AntDesign name="star" size={30} color={colors.white} />
      <Text style={styles.rateText}>{item?.usersRate}</Text>
    </View>
  );
};

const CityName = ({ item, userLanguage }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.rateText}>
        {userLanguage === "ar" ? item?.cityAr : item?.cityEn}
      </Text>
    </View>
  );
};

const Drive = ({ item }) => {
  const { userLanguage } = useUserAuth();
  return (
    <View style={styles.driveContainer}>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: `(screens)/branch`,
            params: {
              branchId: item?.id,
              branchName: userLanguage === "ar" ? item?.nameAr : item?.nameEn,
            },
          });
        }}
      >
        <MaterialIcons name="drive-eta" size={30} color={colors.white} />
        <Text style={styles.rateText}>Drive</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    position: "absolute",
    top: 0,
    left: 5,
    zIndex: 10,
    width: "100%",
    height: "100%",
    gap: 20,
  },
  driveContainer: {
    width: 48,
    height: 48,
    alignItems: "center",
  },

  badge: {
    color: colors.white,
    fontWeight: "300",
    borderColor: colors.primary,
    alignSelf: "flex-end",
    marginRight: 10,
  },

  ratingIcon: { alignItems: "center", width: 48, height: 48 },
  rateText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default BranchHeader;
