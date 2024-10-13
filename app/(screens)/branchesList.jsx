import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { StackScreenOption } from '@constants/headerBarStyle';
import MoreArrow from '@component/shared/MoreArrow';
import LetterAsAvatar from '@component/shared/LetterAsAvatar';
import useShowMoreBranches from '@hooks/useShowMoreBranches';
import colors from '@constants/colors';
import ShowModal from '@component/shared/ShowModal';
import BranchesPage from '@component/home/branchTab/BranchesPage';
import SkeletonBody from '@component/shared/SkeltonBody';
import Container from '@component/shared/Containner';

export default function BranchesList() {
  const { loading, cities, showModel, setShowModel, cityId, setCityId, cityName, setCityName } =
    useShowMoreBranches();

  const handlePressItem = item => {
    setShowModel(true);
    setCityId(item.cityId);
    setCityName(item.cityName);
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handlePressItem(item)} style={styles.pressableItem}>
      <View style={styles.itemContainer}>
        <LetterAsAvatar letter={item.cityName.charAt(0)} />
        <Text style={styles.textCity}>{item.cityName}</Text>
        <View style={styles.counterContainer}>
          <Text style={styles.textCounter}>{item.branchCount}</Text>
          <MoreArrow />
        </View>
      </View>
    </Pressable>
  );

  return (
    <Container>
      <Stack.Screen options={{ title: 'More Branches', ...StackScreenOption }} />
      {loading ? (
        <SkeletonBody howMany={12} loading={loading} height={40} />
      ) : cities.length === 0 ? (
        <Text>No Branches</Text>
      ) : (
        <>
          <FlatList
            data={cities}
            renderItem={renderItem}
            keyExtractor={item => item.cityId.toString()}
            contentContainerStyle={styles.container}
          />
          {showModel && (
            <ShowModal visible={showModel} setVisible={setShowModel} header={cityName}>
              <BranchesPage cityId={cityId} cityName={cityName} />
            </ShowModal>
          )}
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    padding: 10,
  },
  pressableItem: {
    width: '100%',
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: '100%',
  },
  textCity: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textColor,
    flex: 1,
    marginLeft: 10,
  },
  textCounter: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.muteColor,
    width: 20,
    textAlign: 'center',
    borderRadius: 5,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
