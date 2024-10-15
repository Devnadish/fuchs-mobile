import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import LetterAsAvatar from '@component/shared/LetterAsAvatar';
import { useStore } from '@provider/store/testZustand';

const UserAvatar = () => {
  const { userAvatar, userName } = useUserAuth();
  const [isLoading, setIsLoading] = useState(true);
  const bears = useStore(state => state.bears);

  const handlePress = () => {
    router.push('/(profile)/homeProfile');
  };

  useEffect(() => {
    if (userAvatar) {
      // Check if the image is valid by attempting to load it
      Image.prefetch(userAvatar)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false)); // Handle error case
    } else {
      setIsLoading(false); // No avatar, set loading to false
    }
  }, [userAvatar]);

  const avatarContent = useMemo(() => {
    const initial = userName ? userName.charAt(0).toUpperCase() : 'N';

    return isLoading ? (
      <LetterAsAvatar letter={initial} primaryColor />
    ) : (
      <Image source={{ uri: userAvatar }} style={styles.image} />
    );
  }, [isLoading, userAvatar, userName]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.avatarContainer}>
      <View style={styles.imageContainer}>{avatarContent}</View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {userName || 'No Name'}
          {bears}
        </Text>
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

// import React, { useMemo } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { router } from 'expo-router';
// import { useUserAuth } from '@provider/userAuth/userAuthProvider';
// import ExpoImage from '@component/shared/ExpoImage';
// import LetterAsAvatar from '@component/shared/LetterAsAvatar';

// const UserAvatar = () => {
//   const { userAvatar, userName } = useUserAuth();

//   const handlePress = () => {
//     router.push('/(profile)/homeProfile');
//   };

//   const avatarContent = useMemo(() => {
//     // Check if userAvatar is defined, not null, does not end with "/", and does not end with "undefined"
//     const hasValidAvatar =
//       userAvatar !== undefined &&
//       userAvatar !== null &&
//       !userAvatar.endsWith('/') &&
//       !userAvatar.endsWith('undefined');

//     const initial = userName ? userName.charAt(0).toUpperCase() : 'N';

//     return hasValidAvatar ? (
//       <ExpoImage image={userAvatar} style={styles.image} />
//     ) : (
//       <LetterAsAvatar letter={initial} primaryColor />
//     );
//   }, [userAvatar, userName]);

//   return (
//     <TouchableOpacity onPress={handlePress} style={styles.avatarContainer}>
//       <View style={styles.imageContainer}>{avatarContent}</View>
//       <View style={styles.userInfo}>
//         <Text style={styles.userName}>{userName || 'No Name'}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   avatarContainer: {
//     marginLeft: 10,
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 10,
//   },
//   imageContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 50,
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 40,
//     height: 40,
//     borderRadius: 50,
//   },
//   userInfo: {
//     alignItems: 'center',
//   },
//   userName: {
//     fontWeight: 'bold',
//   },
// });

// export default UserAvatar;
