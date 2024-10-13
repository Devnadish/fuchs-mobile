import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '@constants';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import Container from '@component/shared/Containner';
import Pagination from '@component/shared/Pagination';
import useBranchesPage from '@hooks/useBranchesPage';
import { SkeletonBodyRow } from '@component/shared/SkeltonBody';
import ExpoImage from '@component/shared/ExpoImage';
import useIcon from '@hooks/useIcon';
import RNBtn from '@component/shared/RNBtn';
import { router } from 'expo-router';
import LoadingIndicator from '@component/shared/LoadingIndicator';

const BranchesPage = ({ cityId, cityName }) => {
  const { userLanguage, userId } = useUserAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const { branches, loading, totalPages, branchCount } = useBranchesPage(
    cityId,
    userLanguage,
    userId,
    currentPage
  );

  return (
    <Container>
      <BranchHeader
        cityName={cityName}
        branchCount={branchCount ? branchCount : <LoadingIndicator />}
      />
      {loading ? (
        <SkeletonBodyRow howMany={4} loading={loading} width="47%" />
      ) : (
        <BranchList branches={branches} />
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Container>
  );
};

const BranchHeader = ({ cityName, branchCount }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.cityName}>{cityName}</Text>
    <Text style={styles.cityCountText}>{branchCount}</Text>
  </View>
);

const BranchList = ({ branches }) => (
  <FlatList
    data={branches}
    renderItem={({ item }) => <BranchItem item={item} />}
    keyExtractor={item => item.id.toString()}
    contentContainerStyle={styles.listContainer}
    numColumns={2}
  />
);

const BranchItem = ({ item }) => {
  const driveIcon = useIcon('drive', 30, colors.white);
  const handlePress = useCallback(() => {
    if (item?.id) {
      router.push({
        pathname: `(screens)/branchDetail`,
        params: {
          branchId: item.id,
          branchName: item.branchName,
        },
      });
    }
  }, [item]);

  return (
    <View style={styles.branchContainer}>
      <ExpoImage image={item.masterImage} style={styles.branchImage} />
      <Text style={styles.branchName}>{item.branchName}</Text>
      <RNBtn
        containerStyles={styles.btnStyle}
        title="Details & Drive"
        handlePress={handlePress}
        textStyles={{ color: colors.white }}
        icon={driveIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.green,
    borderRadius: 0,
    marginTop: 10,
  },
  branchContainer: {
    width: '47%',
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  branchImage: {
    width: '100%',
    aspectRatio: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cityCountText: {
    color: colors.white,
    fontWeight: 'bold',
    backgroundColor: colors.primary,
    width: 20,
    textAlign: 'center',
    borderRadius: 5,
  },
  cityName: {
    color: colors.primary,
    fontSize: 14,
    padding: 10,
    textAlign: 'right',
  },
  branchName: {
    color: colors.textColor,
    fontSize: 14,
    padding: 5,
    textAlign: 'left',
  },
});

export default BranchesPage;
