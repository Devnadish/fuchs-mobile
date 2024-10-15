import { Tabs } from 'expo-router';
import { colors } from '@constants';
import { ONESTOP } from '@constants/images';
import ExpoImage from '@component/shared/ExpoImage';
import useIcon from '@hooks/useIcon';
import { View, Text } from 'react-native'; // Import View and Text
import ActiveBooking from '@component/home/homeTab/bar/ActiveBookin';
import UserAvatar from '@component/home/homeTab/bar/UserAvatar';
import tr from '@hooks/tr';

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
  const { tabHome, tabOffers, tabBranches, tabContact, tabMmore } = tr(
    'tabHome',
    'tabOffers',
    'tabBranches',
    'tabContact',
    'tabMmore'
  );

  const renderTabIcon =
    (iconName, label) =>
    ({ focused }) => {
      const icon = useIcon(iconName, 24, focused ? colors.danger : colors.primary);
      return <CustomTabBarIcon icon={icon} label={label} />;
    };

  return (
    <Tabs screenOptions={tabOptions}>
      <Tabs.Screen
        name="branchesTab"
        options={{
          title: tabBranches,
          tabBarIcon: renderTabIcon('location', tabBranches),
        }}
      />
      <Tabs.Screen
        name="offersTab"
        options={{
          title: tabOffers,
          tabBarIcon: renderTabIcon('offer', tabOffers),
        }}
      />
      <Tabs.Screen
        name="homeTab"
        options={{
          title: tabHome,
          tabBarIcon: renderTabIcon('home', tabHome),
        }}
      />
      <Tabs.Screen
        name="contactsTab"
        options={{
          title: tabContact,
          tabBarIcon: renderTabIcon('call', tabContact),
        }}
      />
      <Tabs.Screen
        name="moreTab"
        options={{
          title: tabMmore,
          tabBarIcon: renderTabIcon('more', tabMmore),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
