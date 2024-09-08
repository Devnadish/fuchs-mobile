import axios from "axios";
import { UPDATE_PROFILE_IMAGE, UPDATE_PROFILE } from "./endPoints";
import { handleAxiosError } from "./errorHandiling";
export const UPDATE_PRIFILE_IMAGE = async (userData) => {
  try {
    const data = await axios.patch(UPDATE_PROFILE_IMAGE, userData);
    return data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const UPDATE_USER_PROFILE_DATA = async (userData) => {
  try {
    const data = await axios.patch(UPDATE_PROFILE, userData);
    return data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
