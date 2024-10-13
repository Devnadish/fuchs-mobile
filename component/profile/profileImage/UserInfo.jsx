import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import RNBtn from '@component/shared/RNBtn';
import ShowModal from '@component/shared/ShowModal';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import LabelWithDetail from '@component/shared/LabelWithDetail';
import { colors } from '@constants';
import { useTranslation } from 'react-i18next';

export default function UserInfo() {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const {
    userId,
    userName,
    userEmail,
    userMobile,
    userCity,
    userCityId,
    userCar,
    userCarModel,
    userCarYear,
    userLanguage,
    userTheme,
    userAvatar,
  } = useUserAuth();
  return (
    <View>
      <RNBtn
        title={`@${userName}`}
        containerStyles={styles.infoButton}
        textStyles={styles.LabelWithDetailButton}
        handlePress={() => {
          setShowModal(true);
        }}
      />
      <ShowModal setVisible={setShowModal} visible={showModal}>
        <View style={styles.continer}>
          {/* <LabelWithDetail label={'userId'} detail={userId} /> */}
          {/* <LabelWithDetail label={'avatar'} detail={userAvatar} /> */}
          <LabelWithDetail label={t('Name')} detail={userName} />
          <LabelWithDetail label={t('Email')} detail={userEmail} />
          <LabelWithDetail label={t('Mobile')} detail={userMobile} />
          <LabelWithDetail label={t('City')} detail={userCity} />
          {/* <LabelWithDetail label={'CityId'} detail={userCityId} /> */}
          <LabelWithDetail label={t('Car')} detail={userCar} />
          <LabelWithDetail label={t('CarModel')} detail={userCarModel} />
          <LabelWithDetail label={t('CarYear')} detail={userCarYear} />
          {/* <LabelWithDetail
            title={'Language'}
            text={userLanguage === 'ar' ? 'العربية' : 'English'}
          />
          <LabelWithDetail label={'Theme'} detail={userTheme} /> */}
        </View>
      </ShowModal>
    </View>
  );
}

const styles = StyleSheet.create({
  continer: { backgroundColor: colors.white, flex: 1, padding: 20, gap: 10 },
  LabelWithDetailButton: { color: colors.primary, fontSize: 16, fontWeight: 'bold' },
  infoButton: {
    backgroundColor: 'transparent',
    // backgroundColor: "red",
    height: 30,

    width: '70%',
  },
  txtButton: {
    color: 'blue',
  },
});
