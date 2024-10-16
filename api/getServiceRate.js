import axios from 'axios';
import { SERVICES_RATE } from './endPoints';
import { handleAxiosError } from './errorHandling';
export const getServiceRate = async (serviceId, page, limit, rate, language) => {
  try {
    const { data } = await axios.get(`${SERVICES_RATE}`, {
      params: {
        serviceId,
        page,
        limit,
        rate,
        language,
      },
    });
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
