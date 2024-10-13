import { Text, View } from 'react-native';
// import React from 'react';
import { Stack } from 'expo-router';
import ComeingSoon from '@component/shared/ComeingSoon';
import Container from '@component/shared/Containner';
import { useTranslation } from 'react-i18next';

export default function activeBooking() {
  const { t } = useTranslation();
  return (
    <Container>
      <Stack.Screen options={{ title: t('activeBooking'), headerShown: true }} />
      <ComeingSoon />
    </Container>
  );
}
