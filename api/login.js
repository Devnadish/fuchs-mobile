import axios from 'axios';
import { USER_LOGIN } from '@api/endPoints';
import { handleAxiosError } from './errorHandling';

export const userLogin = async (userData) => {
  // Validate input fields
  if (!userData.mobile || !userData.password) {
    return {
      statusCode: 400,
      message: 'Please fill all the fields',
    };
  }

  try {
    const { data } = await axios.post(USER_LOGIN, userData);

    // Handle different login responses
    if (data === 'notExist') {
      return {
        statusCode: 404,
        message: 'User does not exist',
      };
    }

    if (data === 'wrongPassword') {
      return {
        statusCode: 401,
        message: 'Wrong password',
      };
    }

    // Return user data on successful login
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
