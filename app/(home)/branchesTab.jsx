import React from 'react';
import Container from '@component/shared/Containner';
import BranchesPage from '@component/home/branchTab/BranchesPage';
import SelectYourCity from '@component/home/branchTab/SelectYourCity';
import { StyleSheet, View } from 'react-native';
import colors from '@constants/colors';
import useIcon from '@hooks/useIcon';
import RNBtn from '@component/shared/RNBtn';
import { router } from 'expo-router';
import useBranchTab from '@hooks/useBranchTab';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';

const Branches = () => {
  const { userCityId, userCity } = useUserAuth();
  const counter = useBranchTab(); // Use the custom hook

  return (
    <Container>
      <MoreAndFavorate counter={counter} />
      {!userCityId ? <SelectYourCity /> : <BranchesPage cityId={userCityId} cityName={userCity} />}
    </Container>
  );
};

export default Branches;

function MoreAndFavorate({ counter }) {
  return (
    <View style={styles.container}>
      <RNBtn
        icon={useIcon('city', 24, colors.muteColor)}
        title={`More ${counter.allBranchesCounter}`}
        handlePress={() => router.push('/(screens)/branchesList')}
        containerStyles={styles.button}
        textStyles={{ color: colors.textColor }}
        isLoading={!counter.allBranchesCounter}
        loadingText="Loading Branches..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: colors.backgroundColor,
    borderBottomWidth: 0.5,
    borderColor: colors.borderColor,
    padding: 10,
  },
  button: {
    // width: '40%',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.white,
    gap: 5,
  },
});
