import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../constants";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useUserAuth } from "../../../provider/userAuth/userAuthProvider";
import { getBranchesCounter } from "../../../api/getBranchesCounter";
import MoreArrow from "../../shared/MoreArrow";
import { router } from "expo-router";

export default function ExtarList() {
  const { renderData } = useUserAuth();
  const [counter, setCounter] = useState({
    allBranchesCounter: 0,
    favoriteCounter: 0,
  });
  const { userCityId, userId } = useUserAuth();

  useEffect(() => {
    const fetchCounter = async () => {
      const counterBranch = await getBranchesCounter(userId, userCityId);
      setCounter(counterBranch);
    };
    fetchCounter();
  }, [renderData, userId, userCityId]);

  return (
    <View style={styles.container}>
      <ExtraBtn
        icon={
          <MaterialCommunityIcons
            name="home-city"
            size={24}
            color={colors.primary}
          />
        }
        title="More"
        counter={counter.allBranchesCounter}
        onPress={() => router.push("/(screens)/branchesList")}
      />
      <ExtraBtn
        icon={<MaterialIcons name="favorite" size={24} color={colors.danger} />}
        title="Favorite"
        counter={counter.favoriteCounter}
        onPress={() =>
          router.push({
            pathname: "/(screens)/favBranches",
            params: { howManyFav: counter.favoriteCounter },
          })
        }
      />
    </View>
  );
}

const ExtraBtn = ({ onPress, icon, title, counter }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
    {icon}
    <Text style={styles.text}>{title}</Text>
    <View style={styles.counterContainer}>
      <Text style={styles.counterText}>{counter}</Text>
      <MoreArrow />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: colors.backgroundColor,
    borderBottomWidth: 0.5,
    borderColor: colors.borderColor,
    padding: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
    gap: 5,
  },
  text: {
    color: colors.textColor,
    fontSize: 12,
  },
  counterContainer: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  counterText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 12,
  },
});
