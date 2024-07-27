import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import HeaderWithImage from "../../components/auth_screen/HeaderWithImage";
import { colors } from "../../constants";
import RegisterForm from "../../components/auth_screen/create_account/RegisterForm";
import AddImage from "../../components/auth_screen/create_account/AddImage";
import Btn from "../../components/shared/Btn";
import { useLocalSearchParams, useRouter } from "expo-router";
import SafeArea from "../../components/shared/SafeArea";
import BackBtn from "../../components/shared/BackBtn";

export default function Reigster() {
  const [image, setImage] = useState(null);

  return (
    <SafeArea>
      <View
        style={{
          flex: 1,
        }}
      >
        {/* header */}

        <View style={styles.header}>
          {/* <HeaderWithImage back={true} /> */}
          <Text style={styles.title}>Create New Account</Text>
          <BackBtn />
          <AddImage image={image} setImage={setImage} />
        </View>

        {/* body */}
        <View style={styles.body}>
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RegisterForm />
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Btn
            title="Next"
            handlePress={() => {
              router.push("/(auth)/otpScreen");
            }}
          />
        </View>
        {/* footer */}
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    backgroundColor: colors.backgroundColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
  },
  body: {
    flex: 0.7,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 0.1,
    backgroundColor: colors.backgroundColor,
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.textColor,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
