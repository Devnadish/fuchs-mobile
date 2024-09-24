import axios from "axios";
import { BRANCHES_BY_CITY } from "./endPoints";
import { handleAxiosError } from "./errorHandling";
export const getBranchByCity = async (language, page, limit, city, userId) => {
  try {
    const { data } = await axios.get(`${BRANCHES_BY_CITY}`, {
      params: {
        language,
        page,
        limit,
        city,
        userId,
      },
    });
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
