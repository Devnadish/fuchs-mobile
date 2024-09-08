import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { router, Stack } from "expo-router";
import { colors } from "../../constants";
import { getUserByMobile } from "../../api/getUserByMobile";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Btn from "../../component/shared/Btn";
import ShowModal from "../../component/shared/ShowModal";
import SelectCity from "../../component/profile/SelectCity";
import { UpdateCity } from "../../api/cityAPI";
import { Skeleton } from "moti/skeleton";
import UpdateCityInstraction from "../../component/instraction/UpdateCityInstraction";

export default function City() {
  const [loading, setLoading] = useState(true);
  const [updLoading, setUpdLoading] = useState(false);
  const { userMobile } = useContext(userAuthContext);
  const [city, setCity] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { profile } = await getUserByMobile({ mobile: userMobile });
        if (profile) {
          setCity({ city: profile.city, cityId: profile.cityId });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userMobile]);

  const handleSubmit = async () => {
    setUpdLoading(true);
    const info = { mobile: userMobile, city: city.city, cityId: city.cityId };
    try {
      await UpdateCity(info);
    } catch (error) {
      console.error("Error updating city:", error);
    } finally {
      setUpdLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{ title: `Select City ${userMobile}`, headerShown: true }}
      />

      <View style={styles.container}>
        <UpdateCityInstraction />
        <View style={styles.cityContainer}>
          <MaterialCommunityIcons
            name="city"
            size={24}
            color={colors.muteColor}
          />
          {loading ? (
            <Skeleton
              loading={loading}
              colorMode="light"
              height={50}
              width={"100%"}
              transition={{ type: "timing", duration: 1500 }}
            />
          ) : (
            <Text style={styles.cityText}>{city.city}</Text>
          )}
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.changeButton}
            activeOpacity={0.7}
          >
            <View style={styles.changeButton}>
              <Text style={{ color: colors.muteColor }}>Change</Text>
              <MaterialIcons
                name="arrow-forward-ios"
                size={14}
                color={colors.muteColor}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Btn
            title="Submit"
            handlePress={handleSubmit}
            containerStyles={{ width: "40%", backgroundColor: colors.green }}
            isLoading={updLoading}
            loadingText="Updating..."
          />
          <Btn
            title="Cancel"
            handlePress={() => router.back()}
            containerStyles={{ width: "40%", backgroundColor: colors.danger }}
          />
        </View>
      </View>

      <ShowModal
        visible={showModal}
        setVisible={setShowModal}
        header={"Change City"}
      >
        <SelectCity
          selectedValue={city}
          setSelectedValue={setCity}
          setVisible={setShowModal}
        />
      </ShowModal>
    </>
  );
}

const styles = StyleSheet.create({
  changeButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
    width: "100%",
  },
  cityContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.white,
    height: 50,
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  cityText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  changeButton: {
    marginLeft: "auto",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
