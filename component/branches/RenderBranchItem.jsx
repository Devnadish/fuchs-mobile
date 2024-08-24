import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
const blurhash = "LYLWbgui7e:5V?I:aMbIZ|I.Rknn";
// const blurhash =
//   "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const RenderBranchItem = ({ item, userLanguage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item?.masterImage }}
          style={styles.carImage}
          transition={200}
          placeholder={{ blurhash }}
        />
      </View>

      <View style={styles.info}>
        <View style={styles.ratingIcon}>
          <AntDesign name="star" size={24} color={colors.yellow} />
          <Text style={styles.rateText}>{item?.usersRate}</Text>
        </View>
        <Text style={styles.rateText}>
          {userLanguage === "ar" ? item?.nameAr : item?.nameEn}
        </Text>
      </View>
      <Pressable
        style={styles.seeDetailsContainer}
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
        <Text style={styles.seeDetailsText}>See Details</Text>
      </Pressable>
    </View>
  );
};

export default memo(RenderBranchItem, (prevProps, nextProps) => {
  return prevProps.item?.id === nextProps.item?.id;
});

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: colors.backgroundColor,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.primary,
    overflow: "hidden",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
  },
  carImage: {
    width: "100%",
    height: "100%",
  },
  info: {
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.textColor,
    padding: 5,
    width: "100%",
    opacity: 0.7,
  },
  ratingIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rateText: {
    color: colors.white,
    fontSize: 16,
  },
  seeDetailsContainer: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 5,
    position: "absolute",
    top: 5,
    left: 5,
    elevation: 5,
  },

  seeDetailsText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 16,
  },
});
