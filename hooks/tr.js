import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const tr = (...keys) => {
  console.log(keys);
  const { t } = useTranslation();

  const translations = useMemo(() => {
    return keys.reduce((acc, key) => {
      acc[key] = t(key);
      return acc;
    }, {});
  }, [t, ...keys]); // Spread keys to ensure memoization on key changes

  return translations;
};

export default tr;
