import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../constants";

import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserAuth } from "../../../provider/userAuth/userAuthProvider";

const BranchHeader = ({ item }) => {
  const { userLanguage } = useUserAuth();
  return (
    <View style={styles.continer}>
      <Drive item={item} />
      <CityName item={item} userLanguage={userLanguage} />
      <Rateing item={item} />
    </View>
  );
};

const Rateing = ({ item }) => {
  return (
    <View style={styles.ratingIcon}>
      <AntDesign name="star" size={20} color={colors.yellow} />
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
        <MaterialIcons name="drive-eta" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    justifyContent: "space-between",
    backgroundColor: colors.white,
    padding: 15,
    width: "100%",
    flexDirection: "row",
  },
  driveContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.green,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    backgroundColor: "transparent",
    color: colors.textColor,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    fontWeight: "300",
    borderColor: colors.borderColor,
    borderWidth: 1,
    height: 30,
  },

  ratingIcon: {
    alignItems: "center",
  },
  rateText: {
    color: colors.textColor,
    fontSize: 12,
  },
});

export default BranchHeader;
