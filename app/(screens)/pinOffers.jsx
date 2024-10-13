import { Stack } from 'expo-router';
import Container from '@component/shared/Containner';
import ComeingSoon from '@component/shared/ComeingSoon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function PinOffers() {
  const { t } = useTranslation();
  const translations = useMemo(
    () => ({
      title: t('prfilePin_title'),
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
