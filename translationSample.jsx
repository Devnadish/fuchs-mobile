import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  // Memoize translations to avoid recalculating on every render
  const translations = useMemo(
    () => ({
      title: t('title'),
      description: t('description'),
    }),
    [t]
  ); // Dependency array includes 't'

  return (
    <div>
      <h1>{translations.title}</h1> {/* Using the memoized title */}
      <p>{translations.description}</p> {/* Using the memoized description */}
    </div>
  );
};

export default MyComponent;
