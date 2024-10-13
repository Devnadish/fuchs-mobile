import axios from 'axios';
import { USER_LOGIN } from './endPoints';
import { handleAxiosError } from './errorHandling';
export const getUser = async (userData) => {
  try {
    const data = await axios.post(USER_LOGIN, userData);
    return data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
