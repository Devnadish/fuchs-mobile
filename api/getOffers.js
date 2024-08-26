import axios from "axios";
import { OFFERS_DETAIL } from "./endPoints";
export const getOffers = async (language, page, limit, branchId) => {
  console.log("### ", language, page, limit, branchId);

  try {
    const { data } = await axios.get(`${OFFERS_DETAIL}`, {
      params: {
        language,
        page,
        limit,
        branchId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// "http://localhost:3000/api/offer/alloffer?language=ar&page=1&limit=5&branchId=66bb31a72b7dbdff6a173032";
