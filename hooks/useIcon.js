import { getIcon } from '@constants/icons';
import { useMemo } from 'react';

const useIcon = (iconName, iconSize, iconColor) => {
  return useMemo(() => getIcon(iconName, iconSize, iconColor), [iconName, iconSize, iconColor]);
};

export default useIcon;
