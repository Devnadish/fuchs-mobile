import ComeingSoon from '@component/shared/ComeingSoon';
import Container from '@component/shared/Containner';
import { Stack } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
// import React from 'react';

export default function passwordPage() {
  const { t } = useTranslation();
  const translations = useMemo(
    () => ({
      title: t('passwordPageProfile_title'),
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
