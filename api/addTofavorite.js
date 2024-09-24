import axios from "axios";
import { FAVORITE_BRANCHES } from "./endPoints";
import { handleAxiosError } from "./errorHandling";
export const addToFavorites = async (userData) => {
  try {
    const data = await axios.post(FAVORITE_BRANCHES, userData);
    return data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const RemoveFavorites = async (userData) => {
  try {
    // Correctly send userData in the data property
    const response = await axios.delete(FAVORITE_BRANCHES, {
      data: userData,
    });
    return response.data; // Return the data from the response
  } catch (error) {
    // Ensure handleAxiosError is defined and handles the error appropriately
    handleAxiosError(error);
    throw error; // Optionally rethrow the error for further handling
  }
};
