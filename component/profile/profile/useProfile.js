// hooks/useProfile.js
import { useState } from 'react';
import { UPDATE_USER_PROFILE_DATA } from '@api/updateUserProfile';
import { showToast } from '@lib/nadish';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import { router } from 'expo-router';

const useProfile = () => {
  const { userName: contextUserName, userEmail, userMobile, updateProfile } = useUserAuth();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [userName, setUserName] = useState(contextUserName);
  const [email, setEmail] = useState(userEmail);

  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const userInformation = { mobile: userMobile, name: userName, email };
      const updateData = await UPDATE_USER_PROFILE_DATA(userInformation);
      if (updateData) {
        await updateProfile({ userName, userEmail: email });
        showToast('Profile updated successfully');
        setTimeout(() => router.back(), 2000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    userName,
    email,
    setUserName,
    setEmail,
    updateLoading,
    handleUpdate,
  };
};

export default useProfile;
