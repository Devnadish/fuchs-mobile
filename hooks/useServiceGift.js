import { useState, useEffect } from 'react';
import { getServiceGiftFromDb } from '@api/getServiceGift';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';

const useServiceGift = serviceId => {
  const [gift, setGift] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userLanguage } = useUserAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getServiceGiftFromDb(userLanguage, serviceId);
        setGift(data);
      } catch (error) {
        console.error('Error fetching gifts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userLanguage, serviceId]);

  return { gift, loading };
};

export default useServiceGift;
