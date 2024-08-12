import React, { useEffect, useState } from "react";
import Input from "../../component/shared/Input";
import FormContainer from "../../component/shared/FormContainer";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../constants";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { showToast } from "../../lib/nadish";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyle } from "../../styles/globalStyle";

export default function RegisterForm({
  name,
  setName,
  mobile,
  setMobile,
  email,
  setEmail,
  passWord,
  setPassWord,
  city,
  setCity,
  car,
  setCar,
  carModel,
  setCarModel,
  carYear,
  setCarYear,
  errorMsg,
}) {
  const params = useLocalSearchParams();

  useEffect(() => {
    setCity(params.selectedCity);
  }, [params.selectedCity]);

  useEffect(() => {
    setCar(params.selectedCar);
  }, [params.selectedCar]);

  useEffect(() => {
    setCarModel(params.selectedCarModel);
  }, [params.selectedCarModel]);

  return (
      <ScrollView
        contentContainerStyle={globalStyle.scroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <FormContainer
          title={"Register"}
          icon={<FontAwesome name="user" size={24} color={colors.muteColor} />}
        >
          {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
          <Input
            label="Name"
            placeholder="Enter Name"
            text={name}
            setText={setName}
            validationMsg="Enter Valid Name"
            reqierd
          />
          <Input
            label="Mobile"
            placeholder="Enter Mobile"
            text={mobile}
            setText={setMobile}
            reqierd
            keyboardType="numeric"
            maxLength={10}
            // keyboardType="phone-pad"
          />
          <Input
            label="E-mail"
            placeholder="Enter Email"
            text={email}
            setText={setEmail}
            reqierd
          />
          <Input
            label="Password"
            placeholder="Enter Password"
            text={passWord}
            setText={setPassWord}
            reqierd
            secureTextEntry
            maxLength={10}
          />
        </FormContainer>

        {/* selct city */}
        <SelectCity city={city} />

        <FormContainer
          title={"Car Details"}
          icon={<FontAwesome5 name="car" size={24} color={colors.muteColor} />}
        >
          <SelectCar car={car} setCarModel={setCarModel} />

          <SelectCarModel
            car={params.selectedCar}
            carId={params.selectedCarId}
            carModel={carModel}
            setCarModel={setCarModel}
          />

          <Input
            label="Car Year"
            placeholder="Enter Car Year"
            text={carYear}
            setText={setCarYear}
          />
        </FormContainer>
      </ScrollView>
  );
}

const SelectCity = ({ city }) => {
  return (
    <FormContainer
      title={"City"}
      icon={
        <MaterialCommunityIcons
          name="home-city-outline"
          size={24}
          color={colors.muteColor}
        />
      }
    >
      <Pressable onPress={() => router.push("city")}>
        <View style={styles.selectButton}>
          <Text style={styles.whyText}>
            <Text style={styles.whyText}>{city || "Select Your City"}</Text>
          </Text>
          <Entypo name="select-arrows" size={24} color={colors.muteColor} />
        </View>
      </Pressable>
    </FormContainer>
  );
};

const SelectCar = ({ car, setCarModel }) => {
  const handleOnPress = () => {
    setCarModel("Select Your Car Model"); //clear the car model
    router.push("cars"); //navigate to cars
  };
  return (
    <Pressable onPress={() => handleOnPress()}>
      <View style={styles.selectButton}>
        <Text style={styles.whyText}>
          <Text style={styles.whyText}>{car || "Select Your Car"}</Text>
        </Text>
        <Entypo name="select-arrows" size={24} color={colors.muteColor} />
      </View>
    </Pressable>
  );
};

const SelectCarModel = ({ car, carId, carModel }) => {
  const handleOnPress = () => {
    if (!car) {
      showToast("Please select car first");
      return;
    }
    router.push({
      pathname: "carModel",
      params: { selectedCar: car, selectedCarId: carId },
    });
  };
  return (
    <Pressable onPress={() => handleOnPress()}>
      <View style={styles.selectButton}>
        <Text style={styles.whyText}>
          <Text style={styles.whyText}>
            {carModel || "Select Your Car Model"}
          </Text>
        </Text>
        <Entypo name="select-arrows" size={24} color={colors.muteColor} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },

  whyText: {
    marginLeft: 10,
    fontSize: 16,
  },

  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: colors.backgroundColor,
    flexGrow: 1,
  },
  errorMsg: {
    position: "absolute",
    top: 0,
    right: 10,
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
