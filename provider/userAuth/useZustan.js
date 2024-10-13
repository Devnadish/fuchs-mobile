import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  checkLoginStatus: async () => {
    const storedData = await AsyncStorage.getItem('userData');
    set({
      userData: storedData ? { ...JSON.parse(storedData), isLogin: true } : get().userData,
      loading: false,
    });
  },

  updateUserData: async (newData) => {
    set({ contextUpdateLoading: true });
    try {
      const updatedData = {
        ...get().userData,
        ...newData,
        userAvatar: newData.userAvatar ? cloudUrl + newData.userAvatar : get().userData.userAvatar,
        isLogin: true,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
      set({ userData: updatedData });
    } catch (error) {
      console.error('Failed to update user data:', error);
    } finally {
      set({ contextUpdateLoading: false });
    }
  },

  login: (userData) => get().updateUserData(userData),
  loadAsGuest: () => get().updateUserData({ userId: 'Guest', isLogin: false }),
  logout: async () => {
    await AsyncStorage.clear();
    set({ userData: { ...get().userData, isLogin: false } });
  },
}));

export default useUserAuthStore;
