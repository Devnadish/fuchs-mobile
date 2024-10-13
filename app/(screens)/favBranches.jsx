import React, { useMemo } from 'react';

import Container from '@component/shared/Containner';
import ComeingSoon from '@component/shared/ComeingSoon';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function FavorateBranchesPage() {
  const { t } = useTranslation();
  const translations = useMemo(
    () => ({
      title: t('prfileFavorite_title'),
    }),
    [t]
  );
  return (
    <Container>
      <Stack.Screen options={{ title: translations.title, headerShown: true }} />
      <ComeingSoon />
    </Container>
  );
}
