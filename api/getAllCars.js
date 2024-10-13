import axios from 'axios';
import { GET_ALL_CARS } from './endPoints';
import { handleAxiosError } from './errorHandling';
export const getAllCars = async () => {
  try {
    const data = await axios.get(GET_ALL_CARS);
    return data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
