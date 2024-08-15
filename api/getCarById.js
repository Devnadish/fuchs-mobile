import axios from "axios";
import { GET_ALL_CARS, GET_CARS_BY_ID } from "./endPoints";
export const getCarsById = async (carId) => {
  try {
    const data = await axios.get(`${GET_CARS_BY_ID}?carId=${carId}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
