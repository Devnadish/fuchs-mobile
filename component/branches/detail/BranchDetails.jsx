import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Txt from "../../shared/Txt";
import { globalStyle } from "../../../styles/globalStyle";

export default function BranchDetails({ branch, userlanguage }) {
  // console.log(JSON.stringify(branch, null, 2));
  return (
    <ScrollView
      contentContainerStyle={globalStyle.scroll}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Txt
          title="Dist"
          text={userlanguage === "ar" ? branch?.distAr : branch?.distEn}
        />
        <Txt
          title="City"
          text={userlanguage === "ar" ? branch?.cityAr : branch?.cityEn}
        />
        <Txt
          title="Address"
          text={userlanguage === "ar" ? branch?.addreesAr : branch?.addreesEn}
        />
        <Txt title="Working Hours" text={branch?.workIngHours} />
        <Txt title="Note" text={branch?.Note} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    gap: 10,
  },
});
