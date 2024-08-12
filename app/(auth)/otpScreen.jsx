import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../constants";
import OtpForm from "../../component/auth/OtpForm";
import { router, useLocalSearchParams } from "expo-router";
const imagePlaceholder = require("../../assets/icons/avatarPlaceHolder.png");
import Btn from "../../component/shared/Btn";
import { newUserContext } from "../../provider/newUserProvider/newUserProvider";
import { showToast } from "../../lib/nadish";
import { createNewuser } from "../../api/createNewuser";
import { checkisExisit } from "../../api/checkUserIsExist";
import { uploadImageToCloudnary } from "../../util/uploadImageToCloudnary";
import { globalStyle } from "../../styles/globalStyle";

export default function OtpScreen() {
  const params = useLocalSearchParams();
  const { userAvatar } = useContext(newUserContext);
  const [enterOtp, setEnterOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageId, seImageId] = useState("");

  const handleCreateNewUser = async (params) => {
    //  >>>>>>>>>>>>> 1. check otp
    let checkOtp = false;
    enterOtp === params.smsToken ? (checkOtp = true) : (checkOtp = false);
    if (!checkOtp) {
      showToast("wrong otp", "error");
      return;
    }

    setLoading(true);
    //  >>>>>>>>>>>>> 2. upload image and get image public id
    let imagePublicId;
    try {
      imagePublicId = await uploadImageToCloudnary(
        userAvatar,
        "oneStopUserAvatar",
        "userAvatar"
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    //  >>>>>>>>>>>>> 3. generate user data
    const userData = {
      name: params.name,
      mobile: params.mobile,
      email: params.email,
      password: params.passWord,
      city: params.city,
      car: params.car,
      carModel: params.carModel,
      carYear: params.carYear,
      smsToken: params.smsToken,
      avatar: imagePublicId.public_id || "null",
    };

    //  >>>>>>>>>>>>> 4. recheck if user already exisit

    const isExist = await checkisExisit(userData.email, userData.mobile); // Check is exisit in Database

    if (isExist === "exist") {
      showToast("user already exisit");
      return;
    }

    //  >>>>>>>>>>>>> 5. create the user
    const createUser = await createNewuser(userData); //create new user

    setLoading(false);
    //  >>>>>>>>>>>>> 6. if user created go to login screen
    router.push("login");
  };

  return (
    <View style={globalStyle.container}>
      <View style={styles.header}>
        <UserInformation params={params} userAvatar={userAvatar} />
        <Pressable
          onPress={() => {
            router.back();
          }}
          style={styles.updtaeBtn}
        >
          <Text>Update</Text>
        </Pressable>
      </View>

      {/* body */}
      <View style={styles.body}>
        <Text style={styles.title}>{params.smsToken}</Text>
        <OtpForm enterOtp={enterOtp} setEnterOtp={setEnterOtp} />
      </View>

      <View style={styles.footer}>
        <Btn
          title="Register user"
          handlePress={() => {
            handleCreateNewUser(params);
          }}
          isLoading={loading}
          loadingText="Creating User..."
        />
      </View>
    </View>
  );
}

const UserInformation = ({ params, userAvatar }) => {
  return (
    <View style={styles.useInfo}>
      <View style={styles.imageContainer}>
        {!userAvatar ? (
          <Image style={styles.image} source={imagePlaceholder} />
        ) : (
          <Image style={styles.image} source={{ uri: userAvatar }} />
        )}
      </View>

      <ShowData title="Name:" data={params.name} />
      <ShowData title="Email:" data={params.email} />
      <ShowData title="Mobile:" data={params.mobile} />
      <ShowData title="PassWord:" data={params.passWord} />
      <ShowData title="City:" data={params.city} />
      <ShowData title="Car:" data={params.car} />
      <ShowData title="Car Model:" data={params.carModel} />
      <ShowData title="Car Year:" data={params.carYear} />
    </View>
  );
};
const ShowData = ({ title, data }) => {
  return (
    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
      <Text style={{ fontWeight: "bold" }}>{title}</Text>
      <Text>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    padding: 5,
    width: 120,
    height: 120,
    borderWidth: 1,
    borderRadius: 75,
    borderColor: colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 75,
    backgroundColor: colors.primary,
  },

  updtaeBtn: {
    backgroundColor: colors.white,
    borderRadius: 5,
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
    borderWidth: 2,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.6,
    width: "100%",
    gap: 10,

    backgroundColor: colors.backgroundColor,
  },

  useInfo: {
    backgroundColor: colors.white,
    alignItems: "start",
    justifyContent: "center",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  body: {
    flex: 0.2,
    backgroundColor: colors.backgroundColor,
    height: "100%",
    width: "100%",
    justifyContent: "start",
    alignItems: "center",
  },
  footer: {
    flex: 0.2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignSelf: "center",
    padding: 5,
    width: 90,
    height: 90,
    borderWidth: 1,
    borderRadius: 75,
    borderColor: colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 75,
    // alignSelf: "center",
    // resizeMode: "contain",
    // backgroundColor: colors.primary,
  },
});
