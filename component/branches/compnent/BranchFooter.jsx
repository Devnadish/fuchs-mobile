import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "@constants";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function BranchFooter({ item }) {
  const { userLanguage } = useUserAuth();

  const handlePress = () => {
    router.push({
      pathname: `(screens)/branch`,
      params: {
        branchId: item?.id,
        branchName: userLanguage === "ar" ? item?.nameAr : item?.nameEn,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.branchHeader}>
        <View style={styles.ratingIcon}>
          <AntDesign name="star" size={24} color={colors.yellow} />
          <Text style={styles.rateText}>{item.rate}</Text>
        </View>
        <Text style={styles.rateText}>
          {userLanguage === "ar" ? item.cityAr : item.cityEn}
        </Text>
      </View>

      <Text style={styles.branchName}>
        {userLanguage === "ar" ? item?.nameAr : item?.nameEn}
      </Text>
      <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
        <MaterialIcons name="drive-eta" size={30} color={colors.white} />
        <Text style={styles.btnText}>Drive</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: colors.white,
  },
  branchName: {
    color: colors.muteColor,
    fontSize: 14,
    paddingVertical: 5,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: colors.green,
    borderRadius: 5,
    elevation: 2,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
  branchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,

    backgroundColor: colors.white,
  },
  ratingIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  rateText: {
    color: colors.muteColor,
    fontWeight: "bold",
    fontSize: 12,
  },
});
