import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import ShowModal from '@component/shared/ShowModal';
import SelectCars from '@component/carSelecttion/SelectCars';
import RNBtn from '@component/shared/RNBtn';
import { colors } from '@constants';
import useCar from '@component/profile/carProfile/useCar';
import LabelWithDetail from '@component/shared/LabelWithDetail';
import { useTranslation } from 'react-i18next';
import useIcon from '@hooks/useIcon';

export default function Car() {
  const { t } = useTranslation();
  const translations = useMemo(
    () => ({
      title: t('carProfile_title'),
      City: t('City'),
      editBtn: t('editBtn'),
      Car: t('Car'),
      CarModel: t('CarModel'),
      CarYear: t('CarYear'),
      proccessing: t('proccessing'),
      editBtn: t('editBtn'),
    }),
    [t]
  );
  const {
    saveIndicator,
    modalVisible,
    setModalVisible,
    selectedCar,
    setSelectedCar,
    handleSaveCar,
    userLanguage,
  } = useCar();

  return (
    <>
      <Stack.Screen options={{ title: translations.title, headerShown: true }} />
      <View style={styles.container}>
        <CarInstruction />
        <View style={styles.carInfoContainer}>
          <LabelWithDetail label={translations.Car} detail={selectedCar.car} />
          <LabelWithDetail label={translations.CarModel} detail={selectedCar.model} />
          <LabelWithDetail label={translations.CarYear} detail={selectedCar.year} />
          <RNBtn
            title={translations.title}
            handlePress={() => setModalVisible(true)}
            containerStyles={styles.selectedCarbtnContainer}
            textStyles={{ color: colors.primaryBtn, fontWeight: 'bold', fontSize: 17 }}
            icon={useIcon('drive', 24, colors.muteColor)}
          />
          <RNBtn
            title={translations.editBtn}
            handlePress={handleSaveCar}
            containerStyles={styles.saveBtn}
            textStyles={{ color: colors.white }}
            isLoading={saveIndicator}
            loadingText={translations.proccessing}
          />
        </View>
      </View>

      {modalVisible && (
        <ShowModal
          visible={modalVisible}
          setVisible={setModalVisible}
          header="Select car"
          height="90%">
          <SelectCars
            setVisible={setModalVisible}
            confirmCar={selectedCar}
            setConfirmCar={setSelectedCar}
            userLanguage={userLanguage}
          />
        </ShowModal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  carInfoContainer: {
    width: '100%',
    gap: 15,
    padding: 20,
  },
  selectedCarbtnContainer: {
    width: '60%',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  saveBtn: {
    marginTop: 10,
  },
  instructionText: {
    marginBottom: 20,
    padding: 20,
  },
});

function CarInstruction() {
  return (
    <Text style={styles.instructionText}>
      When you select your car, it allows us to tailor our workshop services specifically for your
      vehicle's needs! By choosing your car model, you can easily access specialized maintenance and
      repair services that ensure your vehicle runs smoothly. Our experienced technicians are
      dedicated to providing top-notch care, ensuring your car receives the attention it deserves
      for optimal performance.
    </Text>
  );
}
