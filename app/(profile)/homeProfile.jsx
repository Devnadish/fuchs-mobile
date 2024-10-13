import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@constants';
import { borderRadius, globalStyle } from '@styles/globalStyle';
import UserImage from '@component/profile/profileImage/UserImage';
import UserInfo from '@component/profile/profileImage/UserInfo';
import MoreArrow from '@component/shared/MoreArrow';
import useIcon from '@hooks/useIcon';
import { useTranslation } from 'react-i18next';
import { router, Stack } from 'expo-router';
import tr from '@hooks/tr';
import Container from '@component/shared/Containner';
import { StackScreenOption } from '@constants/headerBarStyle';

export default function Home() {
  const { profile } = tr('profile');
  return (
    <Container>
      <Stack.Screen
        options={{
          title: profile,
          ...StackScreenOption,
        }}
      />
      <ScrollView
        contentContainerStyle={globalStyle.scroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <UserImage />
        <UserInfo />
        <View style={styles.mainContainer}>
          <ActivityMenu />
          <ProfileMenu />
        </View>
      </ScrollView>
    </Container>
  );
}

const ActivityMenu = () => {
  const { t } = useTranslation();
  const activities = [
    {
      href: '/(screens)/activeBooking',
      title: t('prfileMenuActiveBook_title'),
      description: t('prfileMenuActiveBook_description'),
      icon: useIcon('booking', 24, colors.muteColor),
    },
    {
      href: '/(screens)/favBranches',
      title: t('prfileFavorite_title'),
      description: t('prfileFavorite_description'),
      icon: useIcon('favorite', 24, colors.muteColor),
    },
    {
      href: '/(screens)/pinOffers',
      title: t('prfilePin_title'),
      description: t('prfilePin_description'),
      icon: useIcon('pin', 24, colors.muteColor),
    },
  ];

  return (
    <>
      <Text style={styles.titleText}>{t('activity')}</Text>
      <View style={styles.container}>
        {activities.map((activity, index) => (
          <AccessButton key={index} {...activity} />
        ))}
      </View>
    </>
  );
};

const ProfileMenu = () => {
  const { t } = useTranslation();
  const profiles = [
    {
      href: '/(profile)/profile',
      title: t('PageProfile_title'),
      description: t('PageProfile_description'),
      icon: useIcon('user', 24, colors.muteColor),
    },
    {
      href: '/(profile)/passwordPageProfile',
      title: t('passwordPageProfile_title'),
      description: t('passwordPageProfile_description'),
      icon: useIcon('password', 24, colors.muteColor),
    },
    {
      href: '/(profile)/cityProfile',
      title: t('cityProfile_title'),
      description: t('cityProfile_description'),
      icon: useIcon('city', 24, colors.muteColor),
    },
    {
      href: '/(profile)/carProfile',
      title: t('carProfile_title'),
      description: t('carProfile_description'),
      icon: useIcon('drive', 24, colors.muteColor),
    },
    {
      href: '/(profile)/settingProfile',
      title: t('settingProfile_title'),
      description: t('settingProfile_description'),
      icon: useIcon('setting', 24, colors.muteColor),
    },
    {
      href: '/(profile)/logoutProfile',
      title: t('settingLogout_title'),
      description: t('settingLogout_description'),
      icon: useIcon('logout', 24, colors.danger),
    },
  ];

  return (
    <>
      <Text style={styles.titleText}>{t('profile')}</Text>
      <View style={styles.container}>
        {profiles.map((profile, index) => (
          <AccessButton key={index} {...profile} />
        ))}
      </View>
    </>
  );
};

const AccessButton = ({ href, title, description, icon }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.5}
      onPress={() => router.push(href)}
      accessibilityLabel={title}>
      <View style={styles.buttonContent}>
        {icon}
        <View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
      <MoreArrow />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 14,
    color: colors.textColor,
    fontWeight: 'bold',
    width: '100%',
    padding: 5,
  },
  descriptionText: {
    fontWeight: '300',
    color: colors.muteColor,
    fontSize: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: borderRadius,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    gap: 10,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius,
    padding: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import { colors } from '@constants';

// import { borderRadius, globalStyle } from '@styles/globalStyle';
// import UserImage from '@component/profile/profileImage/UserImage';
// import { router } from 'expo-router';
// import UserInfo from '@component/profile/profileImage/UserInfo';
// import MoreArrow from '@component/shared/MoreArrow';
// import useIcon from '@hooks/useIcon';
// import { useTranslation } from 'react-i18next';

// export default function Home() {
//   return (
//     <ScrollView
//       contentContainerStyle={globalStyle.scroll}
//       showsVerticalScrollIndicator={false}
//       showsHorizontalScrollIndicator={false}>
//       <UserImage />
//       <UserInfo />
//       <View style={styles.mainContainer}>
//         <ActivityMenu />
//         <ProfileMenu />
//       </View>
//     </ScrollView>
//   );
// }

// const ActivityMenu = () => {
//   const { t } = useTranslation();
//   return (
//     <>
//       <Text style={styles.titleText}>Activity</Text>
//       <View style={styles.container}>
//         <AcceesButton
//           href={'/(screens)/activeBooking'}
//           title={t('prfileMenuActiveBook_title')}
//           decription={t('prfileMenuActiveBook_description')}
//           icon={useIcon('booking', 24, colors.muteColor)}
//         />
//         <AcceesButton
//           href={'/(screens)/favBranches'}
//           title={t('prfileFavorite_title')}
//           decription={t('prfileFavorite_description')}
//           icon={useIcon('favorite', 24, colors.muteColor)}
//         />
//         <AcceesButton
//           href={'/(screens)/pinOffers'}
//           title={t('prfilePin_title')}
//           decription={t('prfilePin_description')}
//           icon={useIcon('pin', 24, colors.muteColor)}
//         />
//       </View>
//     </>
//   );
// };
// const ProfileMenu = () => {
//   const { t } = useTranslation();
//   return (
//     <>
//       <Text style={styles.titleText}>Profile</Text>
//       <View style={styles.container}>
//         <AcceesButton
//           href={'/(screens)/profile'}
//           title={t('PageProfile_title')}
//           decription={t('PageProfile_description')}
//           icon={useIcon('user', 24, colors.muteColor)}
//         />
//         <AcceesButton
//           href={'/(screens)/passwordPageProfile'}
//           title={t('passwordPageProfile_title')}
//           decription={t('passwordPageProfile_description')}
//           icon={useIcon('password', 24, colors.muteColor)}
//         />
//         <AcceesButton
//           href={'/(screens)/cityProfile'}
//           title={t('cityProfile_title')}
//           decription={t('cityProfile_description')}
//           icon={useIcon('city', 24, colors.muteColor)}
//         />
//         <AcceesButton
//           href={'/(screens)/carProfile'}
//           title={t('carProfile_title')}
//           decription={t('carProfile_description')}
//           icon={useIcon('drive', 24, colors.muteColor)}
//         />
//         <AcceesButton
//           href={'/(screens)/settingProfile'}
//           title={t('settingProfile_title')}
//           decription={t('settingProfile_description')}
//           icon={useIcon('setting', 24, colors.muteColor)}
//         />
//         <AcceesButton
//           href={'/(screens)/logoutProfile'}
//           title={t('settingLogout_title')}
//           decription={t('settingLogout_description')}
//           icon={useIcon('logout', 24, colors.danger)}
//         />
//       </View>
//     </>
//   );
// };

// const AcceesButton = ({ href, title, decription, icon }) => {
//   console.log(href);
//   return (
//     <TouchableOpacity
//       style={styles.itemContainer}
//       activeOpacity={0.5}
//       onPress={() => router.push(href)}
//       accessibilityLabel={title} // Add accessibility label
//     >
//       <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
//         {icon}
//         <View>
//           <Text style={styles.titleText}>{title}</Text>
//           <Text style={styles.decriptionText}>{decription}</Text>
//         </View>
//       </View>
//       <MoreArrow />
//     </TouchableOpacity>
//   );
// };

// export const styles = StyleSheet.create({
//   menuBox: {
//     width: '100%',
//     backgroundColor: colors.white,
//     gap: 10,
//     padding: 10,
//     borderRadius: borderRadius,
//   },
//   titleText: { fontSize: 14, color: colors.textColor, fontWeight: 'bold', width: '100%' },
//   decriptionText: {
//     fontWeight: 'light',
//     color: colors.muteColor,
//     fontSize: 12,
//   },
//   menuContainer: {
//     width: '100%',
//     backgroundColor: colors.white,
//     gap: 10,
//     padding: 10,
//     borderRadius: borderRadius,
//   },
//   itemContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     height: 50,
//     backgroundColor: colors.backgroundColor,
//     alignItems: 'center',
//     gap: 10,
//     justifyContent: 'space-between',
//     borderRadius: borderRadius,
//     padding: 10,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     gap: 10,
//     backgroundColor: colors.white,
//     width: '100%',
//     borderRadius: borderRadius,
//     borderWidth: 0.5,
//     borderColor: colors.borderColor,
//   },
//   mainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     gap: 10,
//     width: '100%',
//   },
// });
