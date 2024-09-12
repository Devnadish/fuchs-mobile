import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { getAllCars } from "../../api/getAllCars";
import { colors } from "../../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { updateUserCar } from "../../api/updateUserCar";
import { showToast } from "../../lib/nadish";
import CarsFlatList from "./CarsFlatList";
import CarsYaerFlatList from "./CarsYaerFlatList";
import { baseContainerStyle } from "../../styles/globalStyle";
import CarsModeFlatList from "./CarsModeFlatList";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";

export default function SelectCars({ setVisible, setConfirmCar }) {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState({});
  const [carsModel, setCarsModel] = useState([]);

  const [loading, setLoading] = useState(false);

  const getCarsData = async () => {
    setLoading(true);
    const carsData = await getAllCars();
    setCars(carsData);
    setLoading(false);
  };

  useEffect(() => {
    getCarsData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <CarsFlatList
        cars={cars}
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
        setCarsModel={setCarsModel}
        loading={loading}
        setLoading={setLoading}
      />
      <CarsModeFlatList
        carsModel={carsModel}
        setSelectedCar={setSelectedCar}
        selectedCar={selectedCar}
      />
      <CarsYaerFlatList
        setSelectedCar={setSelectedCar}
        selectedCar={selectedCar}
        currentYear={new Date().getFullYear()}
      />
      <Confirm
        selectedCar={selectedCar}
        setVisible={setVisible}
        setConfirmCar={setConfirmCar}
      />
    </View>
  );
}

const Confirm = ({ selectedCar, setVisible, setConfirmCar }) => {
  const handleSaveCar = async () => {
    setConfirmCar(selectedCar);
    setVisible(false);
  };

  return (
    <View style={[styles.selectionContainer, { fontWeight: "bold", gap: 10 }]}>
      <Text
        style={[
          styles.selectionText,
          { color: !selectedCar?.carName ? colors.danger : colors.green },
        ]}
      >
        {selectedCar?.carName || "select Car"}
      </Text>

      <Text
        style={[
          styles.selectionText,
          {
            color: !selectedCar?.model ? colors.danger : colors.green,
          },
        ]}
      >
        {selectedCar?.model || "select Model"}
      </Text>
      <Text
        style={[
          styles.selectionText,
          {
            color: !selectedCar.year ? colors.danger : colors.green,
          },
        ]}
      >
        {selectedCar.year || "select Year"}
      </Text>
      <TouchableOpacity
        onPress={() => {
          handleSaveCar();
        }}
        style={styles.saveSelection}
        activeOpacity={0.8}
      >
        <AntDesign name="check" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  saveSelection: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.green,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  selectionContainer: {
    ...baseContainerStyle,
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 5,
    height: 50,
  },
  selectionText: {
    color: colors.primaryBtn,
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
