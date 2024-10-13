// hooks/useCities.js
import { useEffect, useState, useCallback } from 'react';
import { getAllCity } from '@api/cityAPI';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';

const useCities = () => {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userLanguage } = useUserAuth();

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const cities = await getAllCity(userLanguage);
        setCityData(cities);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [userLanguage]);

  const handleOnPressItem = useCallback(
    (item, setCity, setCityId, setVisible) => {
      setCity(item.cityName);
      setCityId(item.id);
      setVisible(false);
    },
    [userLanguage]
  );

  return { cityData, loading, handleOnPressItem };
};

export default useCities;
