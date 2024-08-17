import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { getAllCars } from "../../api/getAllCars";
import { colors } from "../../constants";
import CarsList from "./CarsList";
import CarsModel from "./CarsModel";
import CarsYear from "./CarsYaer";
export default function SelectCar({
  selectedCar,
  setSelectedCar,
  selectedModel,
  setSelectedModel,
  selectedYear,
  setSelectedYear,
}) {
  const [cars, setCars] = useState([]);
  const [carsModel, setCarsModel] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);

  const currentYear = new Date().getFullYear();

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
      <View style={styles.carContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            animating={loading}
          />
        ) : (
          <>
            <CarsList
              cars={cars}
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
              setCarsModel={setCarsModel}
              setLoadingModel={setLoadingModel}
              setSelectedYear={setSelectedYear}
              setSelectedModel={setSelectedModel}
            />
          </>
        )}
      </View>

      <View style={styles.modelContainer}>
        {loadingModel ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            animating={loadingModel}
          />
        ) : (
          <>
            {!selectedCar && (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.muteColor,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Select Your Car
                </Text>
              </View>
            )}

            <CarsModel
              carsModel={carsModel}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
          </>
        )}
      </View>

      <View style={styles.yearContainer}>
        <CarsYear
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          currentYear={currentYear}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-between",
  },
  carContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundColor,
    height: 120,
    padding: 10,
    // elevation: 5,
  },
  modelContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  yearContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: colors.backgroundColor,
    height: 70,
  },

  text: {
    color: colors.muteColor,
    fontWeight: "semibold",
    fontSize: 12,
    alignSelf: "start",
    width: "100%",
    // backgroundColor: colors.danger,
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  saveContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: colors.muteColor,
    height: 40,
    elevation: 5,
  },
  SaveChangesBtn: {
    backgroundColor: colors.danger,
    width: 68,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 5,
  },
  selectedText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});
