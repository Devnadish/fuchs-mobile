import axios from "axios";
import { UPDATE_USER_PROFILE } from "../api/endPoints";
import { handleAxiosError } from "./errorHandling";
export const updateUserProfile = async (userData) => {
  try {
    const data = await axios.patch(UPDATE_USER_PROFILE, userData);
    return data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
