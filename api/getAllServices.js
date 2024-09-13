import axios from "axios";
import { GET_ALL_SERVICES } from "./endPoints";
import { handleAxiosError } from "./errorHandling";
export const getAllServices = async (language) => {
  try {
    const data = await axios.get(GET_ALL_SERVICES, {
      params: { language },
    });
    return data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
