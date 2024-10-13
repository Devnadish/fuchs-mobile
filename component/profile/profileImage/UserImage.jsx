// import { Image } from "expo-image";
// import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@constants';
import ExpoImage from '@component/shared/ExpoImage';
import { useEffect, useState } from 'react';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import RNBtn from '@component/shared/RNBtn';
import ShowModal from '@component/shared/ShowModal';
import ChangeProfile from './ChangeProfile';
import { useTranslation } from 'react-i18next';

const UserImage = () => {
  const { t } = useTranslation();
  const { userAvatar } = useUserAuth();

  const [avatar, setAvatar] = useState(userAvatar);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setAvatar(userAvatar);
  }, [userAvatar]);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ExpoImage image={avatar} style={styles.image} />
      </View>
      <RNBtn
        title={t('changeImage')}
        handlePress={() => setShowModal(true)}
        containerStyles={styles.changeButon}
      />
      <ShowModal visible={showModal} setVisible={setShowModal} header={t('Change_Profile_Image')}>
        <ChangeProfile setShowModal={setShowModal} setAvatar={setAvatar} avatar={avatar} />
      </ShowModal>
    </View>
  );
};
export default UserImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderColor: colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 75,
    backgroundColor: colors.primary,
  },

  changeButon: {
    marginTop: 10,
    alignItems: 'center',
    width: 120,
    height: 40,
  },
  changeText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.primary,
  },
});
