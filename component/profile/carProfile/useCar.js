// hooks/useCar.js
import { useState } from 'react';
import { updateUserCar } from '@api/updateUserCar';
import { showToast } from '@lib/nadish';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import { router } from 'expo-router';

const useCar = () => {
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

  const [saveIndicator, setSaveIndicator] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState({
    carId: userCarId,
    modelId: userModelId,
    car: userCar,
    model: userCarModel,
    year: userCarYear,
  });

  const handleSaveCar = async () => {
    setSaveIndicator(true);
    const userCarData = {
      mobile: userMobile,
      carId: selectedCar.carId || '',
      car: selectedCar.car || '',
      carModelId: selectedCar.modelId || '',
      carModel: selectedCar.model || '',
      carYear: selectedCar.year || '',
    };

    try {
      const updateCar = await updateUserCar(userCarData);
      if (updateCar) {
        await updateProfile({
          userCar: selectedCar.car,
          userCarId: selectedCar.carId,
          userModelId: selectedCar.modelId,
          userCarModel: selectedCar.model,
          userCarYear: selectedCar.year,
        });
        showToast('Car Updated');
        setTimeout(() => router.back(), 2000);
      }
    } catch (error) {
      console.error('Error updating car:', error);
    } finally {
      setSaveIndicator(false);
    }
  };

  return {
    saveIndicator,
    modalVisible,
    setModalVisible,
    selectedCar,
    setSelectedCar,
    handleSaveCar,
    userLanguage,
  };
};

export default useCar;
