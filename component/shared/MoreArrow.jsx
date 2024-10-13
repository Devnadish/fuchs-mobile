import { View } from 'react-native';
// import React from 'react';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import { Entypo } from '@expo/vector-icons';
import { colors } from '@constants';

export default function MoreArrow() {
  const { userLanguage } = useUserAuth();
  return (
    <View>
      {userLanguage === 'ar' ? (
        <Entypo name="chevron-left" size={18} color={colors.muteColor} />
      ) : (
        <Entypo name="chevron-right" size={18} color={colors.muteColor} />
      )}
    </View>
  );
}
