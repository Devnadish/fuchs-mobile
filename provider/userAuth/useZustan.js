import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { I18nManager } from 'react-native';
import { cloudUrl } from '@constants/images';

const useUserAuthStore = create((set, get) => ({
  userData: {
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
  },
  loading: true,
  contextUpdateLoading: false,

  initializeUser: async () => {
    const storedData = await AsyncStorage.getItem('userData');
    const userData = storedData ? JSON.parse(storedData) : {};
    set({ userData: { ...userData, isLogin: !!storedData }, loading: false });
    i18next.changeLanguage(userData.userLanguage || 'en');
    I18nManager.forceRTL(userData.userLanguage === 'ar');
  },

  updateUserData: async newData => {
    set({ contextUpdateLoading: true });
    const { userData } = get();
    const updatedData = {
      ...userData,
      ...newData,
      userAvatar: newData.userAvatar ? cloudUrl + newData.userAvatar : userData.userAvatar,
      isLogin: true,
    };
    await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
    set({ userData: updatedData });
    set({ contextUpdateLoading: false });
  },

  login: async userData => get().updateUserData(userData),
  logout: async () => {
    await AsyncStorage.clear();
    set({ userData: { ...get().userData, isLogin: false } });
  },
}));

export default useUserAuthStore;
