import { Tabs } from 'expo-router';
import { colors } from '@constants';
import { useTranslation } from 'react-i18next';
import { ONESTOP } from '@constants/images';
import ExpoImage from '@component/shared/ExpoImage';
import useIcon from '@hooks/useIcon';
import { View, Text } from 'react-native'; // Import View and Text
import ActiveBooking from '@component/home/homeTab/bar/ActiveBookin';
import UserAvatar from '@component/home/homeTab/bar/UserAvatar';

const tabOptions = {
  tabBarShowLabel: false,
  headerShown: true,
  headerTitleAlign: 'center',
  headerTintColor: colors.linkColor,
  tabBarStyle: { height: 60 },
  headerStyle: { backgroundColor: colors.backgroundColor },
  headerTitle: () => (
    <ExpoImage
      image={ONESTOP}
      style={{ width: 60, height: 40 }}
      width={40}
      height={40}
      radius={2}
    />
  ),
  headerRight: () => <ActiveBooking />,
  headerLeft: () => <UserAvatar />,
};

const CustomTabBarIcon = ({ icon, label }) => {
  return (
    <View style={{ alignItems: 'center', margin: 0 }}>
      {icon}
      <Text style={{ marginTop: 2, fontSize: 12 }}>{label}</Text>
    </View>
  );
};

const TabsLayout = () => {
  const { t } = useTranslation();

  const renderTabIcon =
    (iconName, label) =>
    ({ focused }) => {
      const icon = useIcon(iconName, 24, focused ? colors.danger : colors.primary);
      return <CustomTabBarIcon icon={icon} label={label} />;
    };

  return (
    <Tabs screenOptions={tabOptions}>
      <Tabs.Screen
        name="homeTab"
        options={{
          title: t('tab.home'),
          tabBarIcon: renderTabIcon('home', t('tab.home')),
        }}
      />
      <Tabs.Screen
        name="branchesTab"
        options={{
          title: t('tab.branches'),
          tabBarIcon: renderTabIcon('location', t('tab.branches')),
        }}
      />
      <Tabs.Screen
        name="offersTab"
        options={{
          title: t('tab.offers'),
          tabBarIcon: renderTabIcon('offer', t('tab.offers')),
        }}
      />
      <Tabs.Screen
        name="contactsTab"
        options={{
          title: t('tab.contact'),
          tabBarIcon: renderTabIcon('call', t('tab.contact')),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
