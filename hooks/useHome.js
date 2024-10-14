// useServices.js
import { useEffect, useState, useCallback } from 'react';
import { getAllServices } from '@api/getAllServices';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';

const useHome = () => {
  const { userLanguage } = useUserAuth();
  const [services, setServices] = useState([]);
  const [offerImage, setOfferImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  const fetchServices = useCallback(async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const { services, allOffers } = await getAllServices(userLanguage);
      setServices(services);
      setOfferImage(allOffers);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setError(error); // Set error state
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }, [userLanguage]);

  const refreshServices = useCallback(() => {
    fetchServices(); // Call the fetch function to refresh data
  }, [fetchServices]);

  useEffect(() => {
    fetchServices(); // Load services on mount
  }, [fetchServices]);

  return { services, loading, offerImage, refreshServices, error }; // Return refreshServices and error
};

export default useHome;
