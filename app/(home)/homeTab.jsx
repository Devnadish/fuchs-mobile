import React, { useCallback, memo, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, RefreshControl } from 'react-native';
import ImageSlider from '@component/shared/ImageSlider';
import useHome from '@hooks/useHome';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import useIcon from '@hooks/useIcon';
import colors from '@constants/colors';
import RNBtn from '@component/shared/RNBtn';
import { router } from 'expo-router';
// import SkeletonBody from '@component/shared/SkeletonBody';
import { useTranslation } from 'react-i18next';
import SkeletonBody from '@component/shared/SkeltonBody';

const ITEM_HEIGHT = 200;

const HomePage = () => {
  const { services, loading, offerImage, refreshServices, error } = useHome();
  const { userLanguage } = useUserAuth();
  const { t } = useTranslation();

  const renderServiceCard = useCallback(
    ({ item }) => <ServiceCard item={item} userLanguage={userLanguage} />,
    [userLanguage]
  );

  const handleRefresh = useCallback(() => {
    refreshServices(); // Function to refresh services
  }, [refreshServices]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('error.loadingServices')}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.ImageSliderContainer}>
        <ImageSlider images={offerImage} />
      </View>
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
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} />}
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

const ServiceName = memo(({ title, description }) => (
  <View style={styles.nameContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
));

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
  ImageSliderContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.red, // Adjust as needed
    fontSize: 16,
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
});

export default HomePage;

// import React, { useCallback, memo } from 'react';
// import { FlatList, StyleSheet, View, Text } from 'react-native';
// import ImageSlider from '@component/shared/ImageSlider';
// import useHome from '@hooks/useHome';
// import { useUserAuth } from '@provider/userAuth/userAuthProvider';
// import useIcon from '@hooks/useIcon';
// import colors from '@constants/colors';
// import RNBtn from '@component/shared/RNBtn';
// import { router } from 'expo-router';
// import SkeletonBody from '@component/shared/SkeltonBody';
// import { useTranslation } from 'react-i18next';

// const ITEM_HEIGHT = 200;

// const HomePage = () => {
//   const { services, loading, offerImage } = useHome();
//   const { userLanguage } = useUserAuth();

//   const renderServiceCard = useCallback(
//     ({ item }) => <ServiceCard item={item} userLanguage={userLanguage} />,
//     [userLanguage]
//   );

//   return (
//     <>
//       <ImageSlider images={offerImage} />
//       {loading ? (
//         <SkeletonBody howMany={3} loading={loading} height={ITEM_HEIGHT} width={'100%'} />
//       ) : (
//         <FlatList
//           data={services}
//           renderItem={renderServiceCard}
//           keyExtractor={item => item?.id.toString()}
//           contentContainerStyle={styles.container}
//           showsVerticalScrollIndicator={false}
//           getItemLayout={(data, index) => ({
//             length: ITEM_HEIGHT,
//             offset: ITEM_HEIGHT * index,
//             index,
//           })}
//           windowSize={2}
//         />
//       )}
//     </>
//   );
// };

// const ServiceCard = memo(({ item }) => (
//   <View style={styles.card}>
//     <ServiceName title={item.title} description={item.description} />
//     <ActionButtons
//       serviceId={item.id}
//       rate={item.rate}
//       title={item.title}
//       description={item.description}
//     />
//   </View>
// ));

// const ServiceName = ({ title, description }) => (
//   <View style={styles.nameContainer}>
//     <Text style={styles.title}>{title}</Text>
//     <Text style={styles.description}>{description}</Text>
//   </View>
// );

// const ActionButtons = memo(({ serviceId, rate, title, description }) => {
//   const { t } = useTranslation();

//   const handleNavigation = useCallback((path, params) => {
//     router.push({ pathname: path, params });
//   }, []);

//   const buttons = [
//     {
//       title: t('bookBtn'),
//       path: '/(screens)/bookAppointment',
//       icon: 'booking',
//       color: colors.primary,
//       params: { serviceId, title, description },
//       containterStyles: styles.bookingButton,
//     },
//     {
//       title: null,
//       path: '/(screens)/serviceInfo',
//       icon: 'infocirlce',
//       color: colors.primary,
//       params: { serviceId, title, description },
//       containterStyles: styles.transparentButton,
//     },
//     {
//       title: null,
//       path: '/(screens)/freegift',
//       icon: 'gift',
//       color: colors.green,
//       params: { serviceId, title, description },
//       containterStyles: styles.transparentButton,
//     },
//     {
//       title: rate.toString(),
//       path: '/(screens)/serviceRate',
//       icon: 'rateStar',
//       color: colors.yellow,
//       params: { serviceId, title, description },
//       containterStyles: styles.transparentButton,
//     },
//   ];

//   return (
//     <View style={styles.actionContainer}>
//       {buttons.map(({ title, path, icon, color, params, containterStyles }, index) => (
//         <RNBtn
//           key={index}
//           title={title}
//           handlePress={() => handleNavigation(path, params)}
//           icon={useIcon(icon, 24, color)}
//           containerStyles={containterStyles}
//           textStyles={{ color: colors.primaryBtn }}
//         />
//       ))}
//     </View>
//   );
// });

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     backgroundColor: colors.white,
//     padding: 20,
//     gap: 20,
//   },
//   card: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: colors.muteColor,
//     borderRadius: 10,
//     height: ITEM_HEIGHT,
//     overflow: 'hidden',
//     justifyContent: 'space-between',
//     backgroundColor: colors.white,
//   },
//   nameContainer: {
//     width: '100%',
//     minHeight: 50,
//     padding: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 15,
//   },
//   title: {
//     width: '100%',
//     fontWeight: 'semibold',
//     fontSize: 18,
//     color: colors.textColor,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: colors.borderColor,
//   },
//   description: {
//     color: colors.textColor,
//     fontSize: 14,
//     padding: 10,
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   button: {
//     width: 100,
//     height: 45,
//     backgroundColor: colors.primary, // Adjust as needed
//   },
//   bookingButton: {
//     width: 120,
//     height: 45,
//     backgroundColor: 'transparent',
//   },
//   transparentButton: {
//     width: 100,
//     height: 45,
//     backgroundColor: 'transparent',
//   },
//   transparentText: {
//     color: colors.textColor, // Change text color as needed
//   },
//   textStyles: {
//     color: colors.white, // Adjust as needed
//   },
// });

// export default HomePage;
