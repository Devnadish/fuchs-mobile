import React, { createContext, useEffect, useState, useMemo, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { I18nManager } from 'react-native';
import { cloudUrl } from '@constants/images';

export const userAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const initialUserData = useMemo(
    () => ({
      userId: '',
      userName: '',
      userEmail: '',
      userMobile: '',
      userAvatar: '',
      userRole: '',
      userCity: '',
      userCityId: '',
      userLanguage: 'en',
      userTheme: 'light',
      userCar: '',
      userCarId: '',
      userModelId: '',
      userCarModel: '',
      userCarYear: '',
      isLogin: false,
    }),
    []
  );

  const [userData, setUserData] = useState(initialUserData);
  const [loading, setLoading] = useState(true);
  const [contextUpdateLoading, setContextUpdateLoading] = useState(false);
  const [renderData, setRenderData] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData({ ...parsedData, isLogin: true });
      }
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const { userLanguage } = userData;
    if (!userLanguage) return;
    i18next.changeLanguage(userLanguage);
    I18nManager.forceRTL(userLanguage === 'ar');
  }, [userData.userLanguage, userData]); // Add userData to dependencies

  const updateUserData = useCallback(
    async newData => {
      setContextUpdateLoading(true); // Start loading
      try {
        const updatedData = {
          ...userData,
          ...newData,
          userAvatar: newData.userAvatar ? cloudUrl + newData.userAvatar : userData.userAvatar,
          isLogin: true,
        };
        await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
        setUserData(updatedData);
      } catch (error) {
        console.error('Failed to update user data:', error);
      } finally {
        setContextUpdateLoading(false); // End loading
      }
    },
    [userData] // Include userData in dependencies
  );

  const loginFunction = useCallback(
    async userData => {
      await updateUserData(userData);
    },
    [updateUserData]
  );

  const loginAsGuest = useCallback(async () => {
    const guestData = { userId: 'Guest', isLogin: false };
    await updateUserData(guestData);
  }, [updateUserData]);

  const updateProfile = useCallback(
    async newProfileData => {
      await updateUserData(newProfileData);
    },
    [updateUserData]
  );

  const logout = useCallback(async () => {
    await AsyncStorage.clear();
    setUserData(initialUserData);
  }, [initialUserData]); // No longer needed since initialUserData is memoized

  const contextValue = useMemo(
    () => ({
      ...userData,
      loading,
      loginFunction,
      logout,
      loginAsGuest,
      updateProfile,
      renderData,
      setRenderData,
      contextUpdateLoading,
      setContextUpdateLoading,
    }),
    [
      userData,
      loading,
      loginFunction,
      logout,
      loginAsGuest,
      updateProfile,
      renderData,
      contextUpdateLoading,
      setContextUpdateLoading,
    ]
  );

  return <userAuthContext.Provider value={contextValue}>{children}</userAuthContext.Provider>;
};

// PropTypes validation for UserAuthProvider
// UserAuthProvider.propTypes = {
//   children: PropTypes.node.isRequired, // Validate that children is a node and is required
// };

export const useUserAuth = () => {
  const context = useContext(userAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};
