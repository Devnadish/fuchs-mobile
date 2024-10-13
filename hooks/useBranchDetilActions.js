// useBranchDetilActions.js
import { useState } from 'react';
import { Linking } from 'react-native';
import useCurrentLocation, { openGoogleMapsForNavigation } from '@hooks/useLocation';
import { showToast } from '@lib/nadish';
import useIcon from '@hooks/useIcon';
import { colors } from '@constants';

const useBranchDetilActions = (brid, branchName, phoneNumber) => {
  const currentLocation = useCurrentLocation();
  const [activeAction, setActiveAction] = useState(null);

  const handleDrive = () => {
    setActiveAction('drive');
    if (currentLocation) {
      const { latitude, longitude } = currentLocation;
      openGoogleMapsForNavigation(latitude, longitude, branchName);
    } else {
      showToast('Current location not available.');
    }
  };

  const handleCall = () => {
    setActiveAction('call');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleComplain = () => {
    setActiveAction('complain');
    showToast(`Complain button pressed for ${brid}`);
  };

  const menuItems = [
    {
      label: 'Drive',
      action: handleDrive,
      icon: useIcon('road', 24, activeAction === 'drive' ? colors.primary : colors.muteColor),
      size: activeAction === 'drive' ? 24 : 24, // Increase size when active
    },
    {
      label: 'Call',
      action: handleCall,
      icon: useIcon('call', 24, activeAction === 'call' ? colors.primary : colors.muteColor),
      size: activeAction === 'call' ? 24 : 24,
    },
    {
      label: 'Complain',
      action: handleComplain,
      icon: useIcon('sadFace', 24, activeAction === 'complain' ? colors.primary : colors.muteColor),
      size: activeAction === 'complain' ? 24 : 24,
    },
  ];

  return {
    activeAction,
    menuItems,
  };
};

export default useBranchDetilActions;
