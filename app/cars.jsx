import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { getAllCars } from "../api/getAllCars";
import { colors } from "../constants";
import CarsList from "../component/cars/CarsList";
import CarsModel from "../component/cars/CarsModel";
import CarsYear from "../component/cars/CarsYaer";
export default function Cars() {
  const [cars, setCars] = useState([]);
  const [carsModel, setCarsModel] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const [selectedYear, setSelectedYear] = useState(null);

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
            {/* <Text style={styles.text}>Select Your Car</Text> */}
            <CarsList
              cars={cars}
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
              setCarsModel={setCarsModel}
              setLoadingModel={setLoadingModel}
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
            <Text style={styles.text}>Select Your Car model</Text>
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
        <Text style={styles.text}>Select Your Car model</Text>
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
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "space-between",
  },
  carContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundColor,
    height: 140,
    elevation: 5,
  },
  modelContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.backgroundColor,
    elevation: 5,
  },
  yearContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: colors.backgroundColor,
    height: 120,
    elevation: 5,
    // marginTop: 10,
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
});
