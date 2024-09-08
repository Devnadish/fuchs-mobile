import axios from "axios";
import { GET_SERVICES_INFO } from "./endPoints";
import { handleAxiosError } from "./errorHandiling";
export const getServiceInfoFromDb = async (language, serviceId) => {
  try {
    const { data } = await axios.get(`${GET_SERVICES_INFO}`, {
      params: {
        language,
        serviceId,
      },
    });
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
