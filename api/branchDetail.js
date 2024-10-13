import axios from 'axios';
import { BRANCHES_DETAIL } from './endPoints';
import { handleAxiosError } from './errorHandling';
export const branchDetail = async (brid, language) => {
  try {
    const { data } = await axios.get(`${BRANCHES_DETAIL}`, {
      params: {
        brid,
        language,
      },
    });
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
