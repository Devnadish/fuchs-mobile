import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@constants";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import AddToFavorate from "./AddToFavorate";
import RemoveFormFavorate from "./RemoveFormFavorate";

export default function BranchFooter({ item, setRerender, heartType }) {
  const { userLanguage } = useUserAuth();
  return (
    <View style={styles.continer}>
      <View style={styles.brName}>
        <Text style={styles.rateText}>
          {userLanguage === "ar" ? item?.nameAr : item?.nameEn}
        </Text>
      </View>

      <View style={styles.favorate}>
        {heartType === "add" ? (
          <AddToFavorate
            branchId={item?.id}
            isFavoriteCheck={item.isFavorited}
          />
        ) : (
          <RemoveFormFavorate branchId={item?.id} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 15,
    width: "100%",
    flexDirection: "row",
    gap: 5,
  },
  brName: { flex: 1 },
  favorate: {},

  branchName: { color: colors.textColor },
});
