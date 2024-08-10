import axios from "axios";
import { USER_LOGIN } from "./endPoints";
export const getUser = async (userData) => {
  try {
    const data = await axios.post(USER_LOGIN, userData);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
