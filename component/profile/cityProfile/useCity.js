// hooks/useCity.js
import { useState, useCallback } from 'react';
import { UpdateCity } from '@api/cityAPI';
import { showToast } from '@lib/nadish';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import { router } from 'expo-router';

const useCity = () => {
  const { userMobile, updateProfile, userCity, userCityId } = useUserAuth();
  const [city, setCity] = useState(userCity);
  const [cityId, setCityId] = useState(userCityId);
  const [updLoading, setUpdLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = useCallback(async () => {
    setUpdLoading(true);
    try {
      const updateCity = await UpdateCity({ mobile: userMobile, city, cityId });
      if (updateCity) {
        await updateProfile({ userCity: city, userCityId: cityId });
        showToast('City updated successfully');
        setTimeout(() => router.back(), 2000);
      }
    } catch (error) {
      console.error('Error updating city:', error);
    } finally {
      setUpdLoading(false);
    }
  }, [city, cityId, userMobile, updateProfile]);

  return {
    city,
    cityId,
    setCity,
    setCityId,
    updLoading,
    showModal,
    setShowModal,
    handleSubmit,
  };
};

export default useCity;
