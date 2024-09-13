import axios from "axios";
import { GET_ALL_CITY, UPDATE_CITY } from "./endPoints";
import { handleAxiosError } from "./errorHandling";
export const getAllCity = async (language) => {
  try {
    const { data } = await axios.get(GET_ALL_CITY, {
      params: { language },
    });
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const UpdateCity = async (userData) => {
  try {
    const { data } = await axios.patch(UPDATE_CITY, userData);
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
