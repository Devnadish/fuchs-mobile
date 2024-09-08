import axios from "axios";
import { BRANCHES_BY_CITY } from "./endPoints";
import { handleAxiosError } from "./errorHandiling";
export const getBranchByCity = async (language, page, limit, city) => {
  try {
    const { data } = await axios.get(`${BRANCHES_BY_CITY}`, {
      params: {
        language,
        page,
        limit,
        city,
      },
    });
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
