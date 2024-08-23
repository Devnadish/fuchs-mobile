import axios from "axios";
import { GROUP_BRANCHES_BY_CITY } from "./endPoints";
export const groupBranchesByCity = async (language) => {
  try {
    const { data } = await axios.get(GROUP_BRANCHES_BY_CITY, {
      params: { language },
    });
    // const data = await axios.get(
    //   `${GROUP_BRANCHES_BY_CITY}?language=${language}`
    // );
    return data;
  } catch (error) {
    console.log(error);
  }
};
