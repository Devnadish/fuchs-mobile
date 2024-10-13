// useServices.js
import { useEffect, useState, useCallback } from 'react';
import { getAllServices } from '@api/getAllServices';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';

const useHome = () => {
  const { userLanguage } = useUserAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    try {
      const data = await getAllServices(userLanguage);
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  }, [userLanguage]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, loading };
};

export default useHome;
