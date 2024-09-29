import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Btn from "@component/shared/Btn";
import ShowModal from "@component/shared/ShowModal";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import Txt from "@component/shared/Txt";
import { colors } from "@constants";

export default function UserInfo() {
  const [showModal, setShowModal] = useState(false);
  const {
    userId,
    userName,
    userEmail,
    userMobile,
    userCity,
    userCityId,
    userCar,
    userCarModel,
    userCarYear,
    userLanguage,
    userTheme,
    userAvatar,
  } = useUserAuth();

  return (
    <View>
      <Btn
        title={`@${userName}`}
        containerStyles={styles.infoButton}
        textStyles={styles.txtButton}
        handlePress={() => {
          setShowModal(true);
        }}
      />
      <ShowModal setVisible={setShowModal} visible={showModal}>
        <View style={styles.continer}>
          <Txt title={"userId"} text={userId} />
          <Txt title={"avatar"} text={userAvatar} />
          <Txt title={"Name"} text={userName} />
          <Txt title={"Email"} text={userEmail} />
          <Txt title={"Mobile"} text={userMobile} />
          <Txt title={"City"} text={userCity} />
          <Txt title={"CityId"} text={userCityId} />
          <Txt title={"Car"} text={userCar} />
          <Txt title={"Car Model"} text={userCarModel} />
          <Txt title={"Car Year"} text={userCarYear} />
          <Txt
            title={"Language"}
            text={userLanguage === "ar" ? "العربية" : "English"}
          />
          <Txt title={"Theme"} text={userTheme} />
        </View>
      </ShowModal>
    </View>
  );
}

const styles = StyleSheet.create({
  continer: { backgroundColor: colors.white, flex: 1, padding: 20, gap: 10 },

  infoButton: {
    backgroundColor: "transparent",
    // backgroundColor: "red",
    height: 30,

    width: "70%",
  },
  txtButton: {
    color: "blue",
  },
});
