import React, { useCallback, memo } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ImageSlider from '@component/shared/ImageSlider';
import useHome from '@hooks/useHome';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import useIcon from '@hooks/useIcon';
import colors from '@constants/colors';
import RNBtn from '@component/shared/RNBtn';
import { router } from 'expo-router';
import SkeletonBody from '@component/shared/SkeltonBody';
import { useTranslation } from 'react-i18next';

const images = [
  'https://i.imgur.com/CzXTtJV.jpg',
  'https://i.imgur.com/OB0y6MR.jpg',
  'https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg',
];

const ITEM_HEIGHT = 200;

const HomePage = () => {
  const { services, loading } = useHome();
  const { userLanguage } = useUserAuth();

  const renderServiceCard = useCallback(
    ({ item }) => <ServiceCard item={item} userLanguage={userLanguage} />,
    [userLanguage]
  );

  return (
    <>
      <ImageSlider images={images} />
      {loading ? (
        <SkeletonBody howMany={3} loading={loading} height={ITEM_HEIGHT} width={'100%'} />
      ) : (
        <FlatList
          data={services}
          renderItem={renderServiceCard}
          keyExtractor={item => item?.id.toString()}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          windowSize={2}
        />
      )}
    </>
  );
};

const ServiceCard = memo(({ item }) => (
  <View style={styles.card}>
    <ServiceName title={item.title} description={item.description} />
    <ActionButtons
      serviceId={item.id}
      rate={item.rate}
      title={item.title}
      description={item.description}
    />
  </View>
));

const ServiceName = ({ title, description }) => (
  <View style={styles.nameContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const ActionButtons = memo(({ serviceId, rate, title, description }) => {
  const { t } = useTranslation();

  const handleNavigation = useCallback((path, params) => {
    router.push({ pathname: path, params });
  }, []);

  const buttons = [
    {
      title: t('bookBtn'),
      path: '/(screens)/bookAppointment',
      icon: 'booking',
      color: colors.primary,
      params: { serviceId, title, description },
      containterStyles: styles.bookingButton,
    },
    {
      title: null,
      path: '/(screens)/serviceInfo',
      icon: 'infocirlce',
      color: colors.primary,
      params: { serviceId, title, description },
      containterStyles: styles.transparentButton,
    },
    {
      title: null,
      path: '/(screens)/freegift',
      icon: 'gift',
      color: colors.green,
      params: { serviceId, title, description },
      containterStyles: styles.transparentButton,
    },
    {
      title: rate.toString(),
      path: '/(screens)/serviceRate',
      icon: 'rateStar',
      color: colors.yellow,
      params: { serviceId, title, description },
      containterStyles: styles.transparentButton,
    },
  ];

  return (
    <View style={styles.actionContainer}>
      {buttons.map(({ title, path, icon, color, params, containterStyles }, index) => (
        <RNBtn
          key={index}
          title={title}
          handlePress={() => handleNavigation(path, params)}
          icon={useIcon(icon, 24, color)}
          containerStyles={containterStyles}
          textStyles={{ color: colors.primaryBtn }}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 20,
    gap: 20,
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.muteColor,
    borderRadius: 10,
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  nameContainer: {
    width: '100%',
    minHeight: 50,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  title: {
    width: '100%',
    fontWeight: 'semibold',
    fontSize: 18,
    color: colors.textColor,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  description: {
    color: colors.textColor,
    fontSize: 14,
    padding: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 45,
    backgroundColor: colors.primary, // Adjust as needed
  },
  bookingButton: {
    width: 120,
    height: 45,
    backgroundColor: 'transparent',
  },
  transparentButton: {
    width: 100,
    height: 45,
    backgroundColor: 'transparent',
  },
  transparentText: {
    color: colors.textColor, // Change text color as needed
  },
  textStyles: {
    color: colors.white, // Adjust as needed
  },
});

export default HomePage;
