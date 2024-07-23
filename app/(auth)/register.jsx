import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import HeaderWithImage from "../../components/auth_screen/HeaderWithImage";
import { colors } from "../../constants";
import RegisterForm from "../../components/auth_screen/create_account/RegisterForm";
import AddImage from "../../components/auth_screen/create_account/AddImage";
import Btn from "../../components/shared/Btn";
import { useRouter } from "expo-router";
import SafeArea from "../../components/shared/SafeArea";

export default function Reigster() {
  const [image, setImage] = useState(null);
  const router = useRouter();
  return (
    <SafeArea>
      <View
        style={{
          flex: 1,
        }}
      >
        {/* header */}

        <View style={styles.header}>
          <HeaderWithImage back={true} />
        </View>

        {/* body */}
        <View style={styles.body}>
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>Create New Account</Text>
            <AddImage image={image} setImage={setImage} />
            <RegisterForm />

            <View style={styles.footer}>
              <Btn
                title="Next"
                handlePress={() => {
                  router.push("/(auth)/otpScreen");
                }}
              />
            </View>
          </ScrollView>
        </View>

        {/* footer */}
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.25,
    backgroundColor: colors.backgroundColor,
  },
  body: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 0.25,
    backgroundColor: colors.backgroundColor,
  },
  title: {
    color: colors.textColor,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
