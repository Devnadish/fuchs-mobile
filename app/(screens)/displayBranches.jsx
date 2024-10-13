// import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import BranchesPage from '@component/home/branchTab/BranchesPage';
import Container from '@component/shared/Containner';
import { StackScreenOption } from '@constants/headerBarStyle';

export default function DisplayBranches() {
  const params = useLocalSearchParams();
  const { cityId, cityName } = params;

  return (
    <Container>
      <Stack.Screen
        options={{
          title: { cityName },
          ...StackScreenOption,
        }}
      />

      <BranchesPage cityId={cityId} cityName={cityName} />
    </Container>
  );
}
