import axios from 'axios';
import { GET_CARS_BY_ID } from './endPoints';
import { handleAxiosError } from './errorHandling';
export const getCarsById = async (carId) => {
  try {
    const data = await axios.get(`${GET_CARS_BY_ID}?carId=${carId}`);
    return data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
