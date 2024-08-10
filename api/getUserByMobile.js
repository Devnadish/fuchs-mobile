import axios from "axios";
import { GET_USER_BY_MOBILE } from "./endPoints";
export const getUserByMobile = async (userData) => {
  try {
    const data = await axios.post(GET_USER_BY_MOBILE, userData);
    return data.data;
  } catch (error) {
    console.log("error :", error);
  }
};
