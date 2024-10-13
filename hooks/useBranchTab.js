import { useEffect, useState } from 'react';
import { getBranchesCounter } from '@api/getBranchesCounter';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';

const useBranchTab = () => {
  const { userCityId, userId } = useUserAuth();
  const [counter, setCounter] = useState({
    allBranchesCounter: 0,
    favoriteCounter: 0,
  });

  useEffect(() => {
    const fetchCounter = async () => {
      if (userCityId) {
        const counterBranch = await getBranchesCounter(userId, userCityId);
        setCounter(counterBranch);
      }
    };
    fetchCounter();
  }, [userId, userCityId]);

  return counter;
};

export default useBranchTab;
