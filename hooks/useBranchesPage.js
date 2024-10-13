// useBranches.js
import { useState, useEffect, useCallback } from 'react';
import { getBranchByCity } from '@api/getBranchByCity';

const Limit = 6;

const useBranchesPage = (cityId, userLanguage, userId, currentPage, renderData) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [branchCount, setbranchCount] = useState(0);

  const getBranches = useCallback(
    async page => {
      setLoading(true);
      try {
        const { allBranches, totalPage, branchesCount } = await getBranchByCity(
          userLanguage,
          page,
          Limit,
          cityId,
          userId
        );

        setBranches(allBranches);
        setTotalPages(totalPage);
        setbranchCount(branchesCount);
      } catch (error) {
        console.error('Error fetching branches:', error);
      } finally {
        setLoading(false);
      }
    },
    [userLanguage, cityId, userId]
  );

  useEffect(() => {
    getBranches(currentPage);
  }, [currentPage, renderData, getBranches]); // Include renderData as a dependency

  return { branches, loading, totalPages, branchCount };
};

export default useBranchesPage;
