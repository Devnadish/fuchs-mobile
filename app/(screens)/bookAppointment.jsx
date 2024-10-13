// import React from 'react';
import { Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
// import { colors } from "@constants";
import { globalStyle } from '@styles/globalStyle';
import Container from '@component/shared/Containner';
import tr from '@hooks/tr';

export default function Booking() {
  const params = useLocalSearchParams();
  const { serviceId } = params;
  const { bookBtn } = tr('bookBtn');
  return (
    <Container>
      <Stack.Screen options={{ title: bookBtn, headerShown: true }} />
      <View style={globalStyle.container}>
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{serviceId} </Text>
      </View>
    </Container>
  );
}
