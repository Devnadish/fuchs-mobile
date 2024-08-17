import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { colors } from "../../constants";
import SelectCar from "./SelectCarScreen";
import { showToast } from "../../lib/nadish";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
export default function PopupCars({
  visible,
  setVisible,
  selectedCar,
  setSelectedCar,
  selectedModel,
  setSelectedModel,
  selectedYear,
  setSelectedYear,
  setUser,
}) {
  const { userLanguage } = useContext(userAuthContext);

  useEffect(() => {
    setSelectedCar(null), setSelectedModel(null), setSelectedYear(null);
  }, []);
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <Pressable style={{ flex: 1 }} onPress={() => setVisible(false)}>
        <View style={styles.backDrop} />
      </Pressable>
      <View style={styles.bodyStyle}>
        <CloseBtn
          setVisible={setVisible}
          setSelectedCar={setSelectedCar}
          setSelectedModel={setSelectedModel}
          setSelectedYear={setSelectedYear}
        />
        {selectedCar && (
          <View style={styles.headerStyle}>
            <SelectedData
              car={selectedCar?.carName}
              model={selectedModel?.ModelName}
              year={selectedYear}
              setSelectedCar={setSelectedCar}
              setSelectedModel={setSelectedModel}
              setSelectedYear={setSelectedYear}
              setVisible={setVisible}
              setUser={setUser}
            />
          </View>
        )}

        <SelectCar
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          userLanguage={userLanguage}
        />
        {/* </View> */}
      </View>
    </Modal>
  );
}
const CloseBtn = ({
  setVisible,
  setSelectedCar,
  setSelectedModel,
  setSelectedYear,
}) => {
  return (
    <Pressable
      style={styles.closeBtn}
      onPress={() => {
        setSelectedCar(null);
        setSelectedModel(null);
        setSelectedYear(null);
        setVisible(false);
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        X
      </Text>
    </Pressable>
  );
};

const SelectedData = ({ car, model, year, setVisible, setUser }) => {
  const handleConfirm = () => {
    if (!car) return showToast("Please select car");
    if (!model) return showToast("Please select car model");
    if (!year) return showToast("Please select car year");
    const userCar = {
      car: car,
      carModel: model,
      carYear: year,
    };

    setUser(userCar);
    setVisible(false);
  };

  return (
    <>
      <View style={styles.carAfterSelect}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Car : </Text>
          {car || "Select  Car"}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Model : </Text>
          {model || "Select  Model"}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Year : </Text>
          {year || "Select  Year"}
        </Text>
      </View>
      <View style={{ gap: 5 }}>
        <Pressable onPress={handleConfirm} style={styles.ConfirmButton}>
          <Text style={{ color: "white", fontSize: 12 }}>Confirm</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    position: "relative",
  },
  headerStyle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: 90,
    gap: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.muteColor,
  },
  bodyStyle: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: "90%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  closeBtn: {
    backgroundColor: colors.danger,
    width: 60,
    height: 30,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  ConfirmButton: {
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  carAfterSelect: {
    gap: 5,
    flexGrow: 1,
    justifyContent: "flex-start",
    backgroundColor: colors.lightmuteColor,
    borderColor: colors.borderColor,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
