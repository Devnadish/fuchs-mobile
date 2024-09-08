import axios from "axios";
import { SERVICES_GIFT } from "./endPoints";
import { handleAxiosError } from "./errorHandiling";
export const getServiceGiftFromDb = async (language, serviceId) => {
  try {
    const { data } = await axios.get(`${SERVICES_GIFT}`, {
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
