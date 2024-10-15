// useOffers.js
import { useState, useEffect, useCallback } from 'react';
import { getOffers } from '@api/getOffers';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';

const LIMIT = 5;

const useOffers = selectedOffer => {
  const { userLanguage } = useUserAuth();
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    try {
      const { allOffers, totalPage } = await getOffers(userLanguage, pageNum, LIMIT, selectedOffer);
      setOffers(prevOffers => [...prevOffers, ...allOffers]);
      console.log(JSON.stringify(offers, null, 2));
      setPageCount(totalPage);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  }, [userLanguage, pageNum, selectedOffer]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const loadMoreOffers = () => {
    if (!loading && pageNum < pageCount) {
      setPageNum(prevPageNum => prevPageNum + 1);
    }
  };

  return { loading, offers, loadMoreOffers, pageCount, pageNum, userLanguage };
};

export default useOffers;
