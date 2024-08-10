import axios from "axios";
import { USER_LOGIN } from "../api/endPoints";
export const userLogin = async (userData) => {
  try {
    const data = await axios.post(USER_LOGIN, userData);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
