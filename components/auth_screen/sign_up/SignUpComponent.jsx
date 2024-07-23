import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useRef } from "react";
import { colors } from "../../../constants";
import Btn from "../../shared/Btn";
import { showToast } from "../../../lib/nadish";
import Xlink from "../../shared/Xlink";
import ModelSheet from "../../shared/ModelSheet";
import { AntDesign } from "@expo/vector-icons";

export default function SignUpComponent() {
  const infoModelSheet = useRef(null);
  const handleOpenPress = () => {
    infoModelSheet.current?.present();
  };
  return (
    <View style={styles.containter}>
      <Text
        style={{
          color: colors.textColor,
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Sign Up
      </Text>

      <SignUp handleOpenPress={handleOpenPress} />

      <Btn
        title="Continue as Guest"
        containerStyles={{
          backgroundColor: colors.backgroundColor,
          borderColor: colors.muteColor,
        }}
        textStyles={{
          color: colors.textColor,
        }}
        handlePress={() => {
          showToast("Continue as Guest");
        }}
      />
      <ModelSheet ref={infoModelSheet} title={"Why Should I Sign Up?"} />
    </View>
  );
}

const SignUp = ({ handleOpenPress }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
        marginHorizontal: 20,
      }}
    >
      <Xlink href={"/(auth)/register"} title="Sign Up With Email" />
      <Pressable onPress={handleOpenPress}>
        <View style={styles.whyBtn}>
          <AntDesign name="infocirlce" size={24} color={colors.muteColor} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: "center",
    gap: 25,
    alignItems: "center",
    width: "100%",
  },

  box: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "80%",
  },
  text: {
    color: colors.muteColor,
  },
  link: {
    color: colors.linkColor,
  },
  whyBtn: {
    width: 48,
    borderColor: colors.gray,
    height: 48,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
});
