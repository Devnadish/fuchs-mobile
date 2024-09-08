import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getUserByMobile } from "../../api/getUserByMobile";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { colors } from "../../constants";
import {
  borderRadius,
  globalStyle,
  SkeletonCommonProps,
} from "../../styles/globalStyle";
import Btn from "../../component/shared/Btn";
import { Stack } from "expo-router";
import ShowModal from "../../component/shared/ShowModal";
import SelectCars from "../../component/cars/SelectCars";
import { Skeleton } from "moti/skeleton";
import CarInstrutor from "../../component/instraction/CarInstrutor";

export default function Car() {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState({});

  const [selectedNewCar, setSelectedNewCar] = useState({
    car: null,
    model: null,
    year: null,
  });

  const { userMobile, userLanguage } = useContext(userAuthContext);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const { car } = await getUserByMobile({ mobile: userMobile });
      setSelectedCar({
        carName: car?.car || "select car",
        model: car?.carModel || "select model",
        year: car?.carYear || "select year",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{ title: `Select Car ${userMobile}`, headerShown: true }}
      />

      <View style={globalStyle.container}>
        <CarInstrutor />
        <View style={styles.carInfoContainer}>
          <CarInfo label={"Car : "} value={selectedCar?.carName} />
          <CarInfo label={"Model : "} value={selectedCar?.model} />
          <CarInfo label={"Year : "} value={selectedCar?.year} />
          {selectedCar?.carName ? (
            <Btn
              title="Select Your Car"
              handlePress={() => setModalVisible(true)}
              containerStyles={styles.btnContainer}
              textStyles={{ color: colors.primaryBtn }}
            />
          ) : (
            <Skeleton
              width={100}
              height={40}
              borderRadius={5}
              show={!value}
              {...SkeletonCommonProps}
            />
          )}
        </View>
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
    {value ? (
      <Text>{value}</Text>
    ) : (
      <Skeleton
        width={100}
        height={40}
        borderRadius={5}
        show={!value}
        {...SkeletonCommonProps}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  carInfoContainer: {
    width: "80%",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  carInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.muteColor,
    borderRadius: 5,
    padding: 10,
  },
  btnContainer: {
    width: "60%",
    backgroundColor: "transparent",
  },
});
