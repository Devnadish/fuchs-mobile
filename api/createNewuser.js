import axios from "axios";
import { CREATE_NEW_USER } from "../api/endPoints";
import { showToast } from "../lib/nadish";
import { checkUserExists } from "./checkUserIsExist";
import { handleAxiosError } from "./errorHandling";

export const ValidateBeforeCreate = async (userData) => {
  const { message, type } = dataValidation(userData);
  if (type === "error") {
    showToast(message);
    return false;
  }
  const isExisit = await checkUserExists(userData.mobile);
  return isExisit;
};

export const createNewuser = async (userData) => {
  const { message, type } = dataValidation(userData);
  if (type === "error") {
    showToast(message);
    return false;
  }

  try {
    const { data } = await axios.post(CREATE_NEW_USER, userData);
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const dataValidation = (userData) => {
  const { userName, mobile, password } = userData;

  if (!userName || !mobile || !password) {
    return { message: "Please fill all the fields", type: "error" };
  }

  const mobileRegex = /^(05)([0-9]{8})$/;
  const isPhoneValid = new RegExp(mobileRegex).test(mobile);
  if (!isPhoneValid) {
    return { message: "Enter Valid Phone", type: "error" };
  }

  const passwordRegex = /^(?=.*\d).{4,8}$/;
  const isPasswordValid = new RegExp(passwordRegex).test(password);
  if (!isPasswordValid) {
    return { message: "Enter Valid Password", type: "error" };
  }

  return { message: "", type: "ok" };
};
