import axios from "axios";
import { CREATE_NEW_USER } from "../api/endPoints";
export const createNewuser = async (userData) => {
  try {
    const { data } = await axios.post(CREATE_NEW_USER, userData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
