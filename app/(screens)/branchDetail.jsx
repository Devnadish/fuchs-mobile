import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import RenderImages from '@component/shared/RenderImages';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import LabelWithDetail from '@component/shared/LabelWithDetail';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import colors from '@constants/colors';
import { shadowStyle } from '@styles/globalStyle';
import RNBtn from '@component/shared/RNBtn';
import useIcon from '@hooks/useIcon';
import useBranchDetail from '@hooks/useBranchDetail'; // Custom hook for branch details
import Container from '@component/shared/Containner';
import { StackScreenOption } from '@constants/headerBarStyle';

const BranchDetail = () => {
  const { branchId, branchName } = useLocalSearchParams();
  const { branch, error, loading } = useBranchDetail(branchId);

  if (error) {
    console.error('Error fetching branch details:', error);
    return <Container>Failed to fetch branch details</Container>;
  }

  return (
    <Container>
      <Stack.Screen
        options={{
          title: branchName,
          ...StackScreenOption,
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <RenderImages images={branch?.images} loading={loading} />
        <BranchDetails branch={branch} />
        <WorkingHours />
      </ScrollView>
      <BranchActions
        branchId={branchId}
        phoneNumber={branch?.mobile}
        lat={branch?.lat}
        long={branch?.long}
      />
    </Container>
  );
};

const BranchDetails = ({ branch }) => {
  return (
    <View style={styles.detailsContainer}>
      <LabelWithDetail label="Dist" detail={branch?.dist} />
      <LabelWithDetail label="City" detail={branch?.city} />
      <LabelWithDetail label="Address" detail={branch?.address} />
      <LabelWithDetail label="Note" detail={branch?.note} />
    </View>
  );
};

const BranchActions = React.memo(({ phoneNumber, lat, long, branchId }) => {
  const { makeCall, openMap } = useBranchDetail(branchId);
  const callIcon = useIcon('call', 30, colors.danger);
  const driveIcon = useIcon('drive', 30, colors.green);

  return (
    <View style={styles.btnContainer}>
      <RNBtn
        handlePress={() => makeCall(phoneNumber)}
        icon={callIcon}
        containerStyles={styles.btn}
      />
      <RNBtn handlePress={() => openMap(lat, long)} icon={driveIcon} containerStyles={styles.btn} />
    </View>
  );
});

const WorkingHours = () => (
  <View style={styles.workingHourContainer}>
    <Text>Working Hours</Text>
    <WorkingHour day="Sunday - Thursday" hours="09:00 - 18:00" />
    <WorkingHour day="Friday - Saturday" hours="Day Off" />
  </View>
);

const WorkingHour = ({ day, hours }) => (
  <View style={styles.workingHourRow}>
    <Text>{day}</Text>
    <Text>{hours}</Text>
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  workingHourContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.lightBackgroundColor,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    borderRadius: 5,
  },
  workingHourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '80%',
    height: 55,
    backgroundColor: colors.backgroundColor,
    borderRadius: 15,
    ...shadowStyle,
  },
  btn: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
});

export default BranchDetail;
