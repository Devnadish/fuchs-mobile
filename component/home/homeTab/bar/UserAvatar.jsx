import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import ExpoImage from '@component/shared/ExpoImage';
import LetterAsAvatar from '@component/shared/LetterAsAvatar';

const UserAvatar = () => {
  const { userAvatar, userName } = useUserAuth();

  const handlePress = () => {
    router.push('/(profile)/homeProfile');
  };

  const avatarContent = useMemo(() => {
    // Check if userAvatar is defined, not null, does not end with "/", and does not end with "undefined"
    const hasValidAvatar =
      userAvatar !== undefined &&
      userAvatar !== null &&
      !userAvatar.endsWith('/') &&
      !userAvatar.endsWith('undefined');

    const initial = userName ? userName.charAt(0).toUpperCase() : 'N';

    return hasValidAvatar ? (
      <ExpoImage image={userAvatar} style={styles.image} />
    ) : (
      <LetterAsAvatar letter={initial} primaryColor />
    );
  }, [userAvatar, userName]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.avatarContainer}>
      <View style={styles.imageContainer}>{avatarContent}</View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userName || 'No Name'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
  },
});

export default UserAvatar;
