import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { whyilogin } from "../../constants/textData/whyilogin";
import ModelSheet from "../../component/shared/ModelSheet";
import { colors } from "../../constants";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
export default function WhyIregister() {
  //  const headerHeight = useHeaderHeight();

  const infoModelSheet = useRef(null);
  const handleOpenPress = () => {
    infoModelSheet.current?.present();
  };

  return (
    <View style={{ height: 48, justifyContent: "center" }}>
      <Pressable onPress={handleOpenPress}>
        <View style={styles.whyBtn}>
          <AntDesign name="infocirlce" size={24} color={colors.muteColor} />
        </View>
      </Pressable>
      <ModelSheet ref={infoModelSheet} title={"Why Should I Sign Up?"}>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <Text
            style={{
              padding: 10,
              flexWrap: "wrap",
              fontSize: 16,
              lineHeight: 22,
            }}
          >
            {whyilogin}
          </Text>
        </BottomSheetScrollView>
      </ModelSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 10,
  },

  whyBtn: {
    width: 40,
    borderColor: colors.muteColor,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
