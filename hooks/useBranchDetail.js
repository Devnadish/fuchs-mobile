import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { branchDetail } from '@api/branchDetail';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';

const useBranchDetail = branchId => {
  const [branch, setBranch] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userLanguage } = useUserAuth();

  useEffect(() => {
    const getBranch = async () => {
      setLoading(true);
      try {
        const data = await branchDetail(branchId, userLanguage);
        setBranch(data);
      } catch (error) {
        console.error('Failed to fetch branch details:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (branchId) {
      getBranch();
    } else {
      setLoading(false);
    }
  }, [branchId]);

  // Function to initiate a phone call
  const makeCall = mobile => {
    if (mobile) {
      Linking.openURL(`tel:${mobile}`);
    } else {
      console.warn('No phone number available to call.');
    }
  };

  // Function to open the map application
  const openMap = (lat, long) => {
    if (lat && long) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
      Linking.openURL(url);
    } else {
      console.warn('No location data available to open map.');
    }
  };

  return { branch, error, loading, makeCall, openMap };
};

export default useBranchDetail;
