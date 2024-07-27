import React, { useEffect, useState } from "react";
import Input from "../../shared/Input";
import FormContainer from "../../shared/FormContainer";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../../constants";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { showToast } from "../../../lib/nadish";

export default function RegisterForm() {
  const params = useLocalSearchParams();

  const [name, setName] = useState("");
  const [city, setCity] = useState("Select Your City please");
  const [car, setCar] = useState("Select Your Car");
  const [carModel, setCarModel] = useState("Select Your Car Model");

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
    <>
      <FormContainer
        title={"Register"}
        icon={<FontAwesome name="user" size={24} color={colors.muteColor} />}
      >
        <Input
          label="Name"
          placeholder="Enter Name"
          text={name}
          setText={setName}
        />
        <Input label="Mobile" placeholder="Enter Mobile" />
        <Input label="E-mail" placeholder="Enter Email" />
        <Input label="Password" placeholder="Enter Password" />
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

        <Input label="Car Year" placeholder="Enter Car Year" />
      </FormContainer>
    </>
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
  console.log("master car Data:>>", car, carId);
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
    borderRadius: 10,
    backgroundColor: colors.white,
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
});
