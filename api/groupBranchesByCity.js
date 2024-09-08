import axios from "axios";
import { GROUP_BRANCHES_BY_CITY } from "./endPoints";
import { handleAxiosError } from "./errorHandiling";
export const groupBranchesByCity = async (language) => {
  try {
    const { data } = await axios.get(GROUP_BRANCHES_BY_CITY, {
      params: { language },
    });
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
