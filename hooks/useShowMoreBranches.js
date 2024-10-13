// useCities.js
import { useState, useEffect, useCallback } from 'react';
import { groupBranchesByCity } from '@api/groupBranchesByCity';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';

const useShowMoreBranches = () => {
  const { userLanguage } = useUserAuth();
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [cityId, setCityId] = useState(null);
  const [cityName, setCityName] = useState(null);

  const fetchCities = useCallback(async () => {
    setLoading(true);
    try {
      const cityData = await groupBranchesByCity(userLanguage);

      setCities(cityData);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    } finally {
      setLoading(false);
    }
  }, [userLanguage]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return { loading, cities, showModel, setShowModel, cityId, setCityId, cityName, setCityName };
};

export default useShowMoreBranches;
