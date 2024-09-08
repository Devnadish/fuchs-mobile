import axios from "axios";
import { BRANCHES_DETAIL } from "./endPoints";
import { handleAxiosError } from "./errorHandiling";
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
