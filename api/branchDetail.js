import axios from "axios";
import { BRANCHES_DETAIL } from "./endPoints";
export const branchDetail = async (brid) => {
  console.log(brid);
  try {
    const { data } = await axios.get(`${BRANCHES_DETAIL}`, {
      params: {
        brid,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
