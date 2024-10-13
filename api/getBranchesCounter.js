import axios from 'axios';
import { BRANCHES_COUNTER } from './endPoints';
import { handleAxiosError } from './errorHandling';
export const getBranchesCounter = async (userId, cityId) => {
  try {
    const { data } = await axios.get(`${BRANCHES_COUNTER}`, {
      params: {
        userId,
        cityId,
      },
    });
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
