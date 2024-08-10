import axios from "axios";
import { CHECK_USER_IS_EXIST } from "../api/endPoints";
export const checkisExisit = async (email, mobile) => {
  const userData = { email, mobile };
  try {
    const data = await axios.post(CHECK_USER_IS_EXIST, userData);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
