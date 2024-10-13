// useServiceRate.js
import { useState, useEffect, useCallback } from 'react';
import { getServiceRate } from '@api/getServiceRate';

const LIMIT = 10;

const useServiceRate = (serviceId, userLanguage) => {
  const [serviceRate, setServiceRate] = useState([]);
  const [rateCategory, setRateCategory] = useState(5);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);

  const fetchRate = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getServiceRate(serviceId, page, LIMIT, rateCategory, userLanguage);
      setServiceRate(data);
    } catch (error) {
      console.error('Failed to fetch service rates:', error);
    } finally {
      setLoading(false);
    }
  }, [serviceId, rateCategory, userLanguage, page]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  const handlePageChange = increment => {
    const newPage = page + increment;
    if (newPage > 0 && newPage <= serviceRate.totalPage) {
      setLoadingPage(true);
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (loadingPage) {
      fetchRate();
      setLoadingPage(false);
    }
  }, [loadingPage, fetchRate]);

  return {
    serviceRate,
    rateCategory,
    setRateCategory,
    page,
    loading,
    loadingPage,
    handlePageChange,
  };
};

export default useServiceRate;
