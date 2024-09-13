import axios from "axios";
import { BRANCHES_DETAIL } from "./endPoints";
import { handleAxiosError } from "./errorHandling";
export const branchDetail = async (brid) => {
  try {
    const { data } = await axios.get(`${BRANCHES_DETAIL}`, {
      params: {
        brid,
      },
    });
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
