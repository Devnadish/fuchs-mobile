// useLogin.js
import { useState } from 'react';
import { router } from 'expo-router'; // Adjust the import as necessary
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import { showToast } from '@lib/nadish';
import { userLogin } from '@api/login';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { loginFunction } = useUserAuth();

  const handleLogin = async (mobile, password) => {
    const data = { mobile, password };
    setLoading(true);

    try {
      const response = await userLogin(data);

      if (response.statusCode >= 400) {
        showToast(response.message);
        return;
      }

      const userInformation = {
        userId: response.id,
        userName: response.name,
        userEmail: response.email,
        userMobile: response.mobile,
        userAvatar: response.profile?.avatar,
        userRole: response.role,
        userCity: response.profile?.city,
        userCityId: response.profile?.cityId,
        userLanguage: response.profile?.language || 'en',
        userTheme: response.profile?.theme || 'light',
        userCar: response.car?.car,
        userCarId: response.car?.carId,
        userModelId: response.car?.modelId,
        userCarModel: response.car?.carModel,
        userCarYear: response.car?.carYear,
        isLogin: true,
      };

      await loginFunction(userInformation);
      router.push('/(home)/homeTab');
    } catch (error) {
      showToast('An error occurred during login. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLogin };
};

export default useLogin;
