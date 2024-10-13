import axios from 'axios';
import { UPDATE_USER_CAR } from './endPoints';
import { handleAxiosError } from './errorHandling';
export const updateUserCar = async (userData) => {
  try {
    const data = await axios.patch(UPDATE_USER_CAR, userData);
    return data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
