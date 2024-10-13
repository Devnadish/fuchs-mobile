import axios from 'axios';
import { CHECK_USER_IS_EXIST } from '@api/endPoints';
import { handleAxiosError } from './errorHandling';

export const checkUserExists = async (mobile) => {
  try {
    const { data } = await axios.get(CHECK_USER_IS_EXIST, {
      params: { mobile }, // Ensure mobile is passed as an object
    });

    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
