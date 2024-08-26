import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../constants";
import RegisterForm from "../../component/auth/RegisterForm";
import Btn from "../../component/shared/Btn";
import { useRouter } from "expo-router";
import UserImage from "../../component/auth/UserImage";
import { newUserContext } from "../../provider/newUserProvider/newUserProvider";
import { regesiterValidation } from "../../lib/registeraValidation";
import { checkisExisit } from "../../api/checkUserIsExist";
import { otpSms } from "../../util/otp/sendSmsOpt";
import { showToast } from "../../lib/nadish";
import { globalStyle } from "../../styles/globalStyle";

export default function Reigster() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [city, setCity] = useState("Select Your City please");
  const [car, setCar] = useState("Select Your Car");
  const [carModel, setCarModel] = useState("Select Your Car Model");
  const [carYear, setCarYear] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userAvatar, setuserAvatar } = useContext(newUserContext);

  const router = useRouter();

  const handleNextButton = async () => {
    setLoading(true);
    let goNext = true;
    // const goNext = regesiterValidation(email, mobile, passWord, name); // Check is Entry Valid
    const isExist = await checkisExisit(email, mobile); // Check is exisit in Database

    // check in database if user already exisit
    if (isExist === "exist") {
      showToast("user already exisit");
      setLoading(false);
      setErrorMsg("user already exisit");
      return;
    }

    // check if entry is valid
    if (goNext?.type === "error") {
      showToast(goNext.message, goNext.type);
      setLoading(false);
      setErrorMsg(goNext.message);
      return;
    }

    setLoading(false);
    setErrorMsg(null);
    router.push({
      pathname: "otpScreen",
      params: {
        name: name,
        mobile: mobile,
        email: email,
        passWord: passWord,
        city: city,
        car: car,
        carModel: carModel,
        carYear: carYear,
        smsToken: otpSms(), // generate 4 digit To simulate otp
      },
    });
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={globalStyle.scroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <UserImage userAvatar={userAvatar} setuserAvatar={setuserAvatar} />
          <RegisterForm
            name={name}
            setName={setName}
            mobile={mobile}
            setMobile={setMobile}
            email={email}
            setEmail={setEmail}
            passWord={passWord}
            setPassWord={setPassWord}
            city={city}
            setCity={setCity}
            car={car}
            setCar={setCar}
            carModel={carModel}
            setCarModel={setCarModel}
            carYear={carYear}
            setCarYear={setCarYear}
            errorMsg={errorMsg}
          />
        </View>
      </ScrollView>

      <View style={styles.changeButonContainer}>
        <Btn
          title="Next"
          handlePress={() => handleNextButton()}
          isLoading={loading}
          loadingText="data Process..."
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  changeButonContainer: {
    width: "100%",
    backgroundColor: colors.muteColor,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
