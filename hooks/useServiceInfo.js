// hooks/useServiceInfo.js
import { useState, useEffect } from 'react';
import { getServiceInfoFromDb } from '@api/getServiceInfo';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';

const useServiceInfo = serviceId => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userLanguage } = useUserAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { serviceInfo } = await getServiceInfoFromDb(userLanguage, serviceId);
        setInfo(serviceInfo);
      } catch (error) {
        console.error('Error fetching service info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userLanguage, serviceId]);

  return { info, loading };
};

export default useServiceInfo;
