import axios from "axios";
import { GET_ALL_SERVICES } from "./endPoints";
export const getAllServices = async (language) => {
  try {
    const data = await axios.get(GET_ALL_SERVICES, {
      params: { language },
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
