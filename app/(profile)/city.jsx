import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useCallback } from "react";
import { useUserAuth } from "../../provider/userAuth/userAuthProvider";
import { router, Stack } from "expo-router";
import { colors } from "../../constants";
import { UpdateCity } from "../../api/cityAPI";
import ShowModal from "../../component/shared/ShowModal";
import SelectCity from "../../component/profile/SelectCity";
import UpdateCityInstraction from "../../component/instraction/UpdateCityInstraction";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { showToast } from "../../lib/nadish";
import SaveAndCancel from "../../component/shared/SaveAndCancel";

export default function City() {
  const { userMobile, updateProfile, userCity, userCityId } = useUserAuth();
  const [city, setCity] = useState(userCity);
  const [cityId, setCityId] = useState(userCityId);
  const [updLoading, setUpdLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = useCallback(async () => {
    setUpdLoading(true);
    try {
      const updateCity = await UpdateCity({
        mobile: userMobile,
        city,
        cityId: city.cityId,
      });
      if (updateCity) {
        await updateProfile({ userCity: city, userCityId: cityId });
        showToast("City updated successfully");
        setTimeout(() => router.back(), 2000);
      }
    } catch (error) {
      console.error("Error updating city:", error);
    } finally {
      setUpdLoading(false);
    }
  }, [city, userMobile, updateProfile]);

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
          <Text style={styles.cityText}>{city}</Text>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.changeButton}
            activeOpacity={0.7}
          >
            <Text style={{ color: colors.muteColor }}>Change</Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              color={colors.muteColor}
            />
          </TouchableOpacity>
        </View>
        <SaveAndCancel handleSubmit={handleSubmit} indcator={updLoading} />
      </View>
      <ShowModal
        visible={showModal}
        setVisible={setShowModal}
        header={"Change City"}
      >
        <SelectCity
          setCity={setCity}
          setCityId={setCityId}
          setVisible={setShowModal}
        />
      </ShowModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  cityContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.white,
    height: 50,
    alignItems: "center",
    padding: 10,
  },
  cityText: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
  },
  changeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  submitButton: {
    width: "40%",
    backgroundColor: colors.green,
  },
  cancelButton: {
    width: "40%",
    backgroundColor: colors.danger,
  },
});