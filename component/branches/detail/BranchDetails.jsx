import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Txt from "../../shared/Txt";
import { globalStyle } from "../../../styles/globalStyle";
import { colors } from "../../../constants";

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
        <WorkingHours />
        <Txt title="Note" text={branch?.Note} />
      </View>
    </ScrollView>
  );
}
const WorkingHours = () => {
  return (
    <View style={styles.WorkingHourcontainer}>
      <Text>Working Hours</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 10,
        }}
      >
        <Text>Sunday - Thursday</Text>
        <Text>09:00 - 18:00</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 10,
        }}
      >
        <Text>Friday - Saturday</Text>
        <Text>Day Off</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    gap: 10,
  },
  WorkingHourcontainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.lightbackgroundColor,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
