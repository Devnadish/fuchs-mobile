import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserByMobile } from "@api/getUserByMobile";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import { colors } from "@constants";
import {
  borderRadius,
  globalStyle,
  SkeletonCommonProps,
} from "@styles/globalStyle";
import Btn from "@component/shared/Btn";
import { router, Stack } from "expo-router";
import ShowModal from "@component/shared/ShowModal";
import SelectCars from "@component/cars/SelectCars";
import { Skeleton } from "moti/skeleton";
import CarInstrutor from "@component/instraction/CarInstrutor";
import { updateUserCar } from "@api/updateUserCar";
import SaveAndCancel from "@component/shared/SaveAndCancel";
import { showToast } from "@lib/nadish";

export default function Car() {
  const {
    updateProfile,
    userCar,
    userCarId,
    userModelId,
    userCarModel,
    userCarYear,
    userMobile,
    userLanguage,
  } = useUserAuth();
  const [saveIndcator, setSaveIndcator] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState({
    carId: userCarId,
    modelId: userModelId,
    car: userCar,
    model: userCarModel,
    year: userCarYear,
  });

  const [selectedNewCar, setSelectedNewCar] = useState({
    car: null,
    model: null,
    year: null,
  });

  const handleSaveCar = async () => {
    setSaveIndcator(true);
    const userCar = {
      mobile: userMobile,
      carId: selectedCar?.carId || "",
      car: selectedCar?.car || "",
      carModelId: selectedCar?.modelId || "",
      carModel: selectedCar?.model || "",
      carYear: selectedCar?.year || "",
    };

    const updateCar = await updateUserCar(userCar);
    if (updateCar) {
      await updateProfile({
        userCar: selectedCar?.car,
        userCarId: selectedCar?.carId,
        userModelId: selectedCar?.modelId,
        userCarModel: selectedCar?.model,
        userCarYear: selectedCar?.year,
      });
      showToast("Car Updated");
      setTimeout(() => router.back(), 2000);
    }

    setSaveIndcator(false);
  };

  return (
    <>
      <Stack.Screen
        options={{ title: `Select Car ${userMobile}`, headerShown: true }}
      />
      <View style={styles.container}>
        <CarInstrutor />
        <View style={styles.carInfoContainer}>
          <CarInfo label={"Car : "} value={selectedCar?.car} />
          <CarInfo label={"Model : "} value={selectedCar?.model} />
          <CarInfo label={"Year : "} value={selectedCar?.year} />

          <Btn
            title="Select Your Car"
            handlePress={() => setModalVisible(true)}
            containerStyles={styles.btnContainer}
            textStyles={{ color: colors.primaryBtn }}
          />
        </View>
        <SaveAndCancel handleSubmit={handleSaveCar} indcator={saveIndcator} />
      </View>

      {modalVisible && (
        <ShowModal
          visible={modalVisible}
          setVisible={setModalVisible}
          header={"Select car"}
          height={"90%"}
        >
          <SelectCars
            setVisible={setModalVisible}
            confirmCar={selectedCar}
            setConfirmCar={setSelectedCar}
            userMobile={userMobile}
            userLanguage={userLanguage}
          />
        </ShowModal>
      )}
    </>
  );
}

const CarInfo = ({ label, value }) => (
  <View style={styles.carInfo}>
    <Text>{label}</Text>
    <Text>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  carInfoContainer: {
    width: "100%",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  carInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    gap: 10,
    width: "100%",
    padding: 10,
  },
  btnContainer: {
    width: "60%",
    backgroundColor: "transparent",
  },
});
