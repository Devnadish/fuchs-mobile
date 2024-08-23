import axios from "axios";
import { BRANCHES_BY_CITY } from "./endPoints";
export const getBranchByCity = async (language, page, limit, city) => {
  // console.log("### getBranchByCity master function", {
  //   language,
  //   page,
  //   limit,
  //   city,
  // });
  try {
    const { data } = await axios.get(`${BRANCHES_BY_CITY}`, {
      params: {
        language,
        page,
        limit,
        city,
      },
    });
    // const data = await axios.get(`${BRANCHES_BY_CITY}?language=${language}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// "/api/branches/getbranchbycity?language=ar&page=1&limit=5&city=المدينة ";
