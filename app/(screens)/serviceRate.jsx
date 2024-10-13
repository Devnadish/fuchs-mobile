import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { colors } from '@constants';
import RateFaces from '@component/home/homeTab/serviceCard/RateFaces';
import Container from '@component/shared/Containner';
import useServiceRate from '@hooks/useServiceRate';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getTimeElapsed } from '@lib/nadish';
import SkeletonBody from '@component/shared/SkeltonBody';
import { StackScreenOption } from '@constants/headerBarStyle';

export default function ServiceRate() {
  const params = useLocalSearchParams();
  const { serviceId, userLanguage } = params;

  const {
    serviceRate,
    rateCategory,
    setRateCategory,
    page,
    loading,
    loadingPage,
    handlePageChange,
  } = useServiceRate(serviceId, userLanguage);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.userComment}>
        <Text style={styles.userNameAndData}>{item.userName || 'Anonymous'}</Text>
        <Text style={styles.userNameAndData}>Rate: {item.rate}</Text>
        <Text style={styles.userNameAndData}>{getTimeElapsed(item.updatedAt)}</Text>
      </View>
      <Text style={styles.itemText}>{item.comment}</Text>
    </View>
  );

  return (
    <Container>
      <Stack.Screen
        options={{
          title: params.title,
          ...StackScreenOption,
        }}
      />

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{params.description}</Text>
      </View>

      <RateFaces rateCategory={rateCategory} setRateCategory={setRateCategory} />

      {loading ? (
        <SkeletonBody howMany={5} loading={loading} height={70} />
      ) : (
        <FlatList
          data={serviceRate.serviceRate}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      {loadingPage && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      <Pagination
        page={page}
        pages={serviceRate.totalPage}
        loading={loadingPage}
        handleNextPage={() => handlePageChange(1)}
        handlePreviousPage={() => handlePageChange(-1)}
      />
    </Container>
  );
}

const Pagination = ({ page, pages = 1, loading, handleNextPage, handlePreviousPage }) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        onPress={handlePreviousPage}
        disabled={page === 1 || loading}
        style={styles.arrowButton}>
        <MaterialIcons
          name="arrow-circle-left"
          size={30}
          color={page === 1 || loading ? colors.muteColor : colors.white}
        />
      </TouchableOpacity>
      <Text style={styles.paginationText}>
        {page}/{pages}
      </Text>
      <TouchableOpacity
        onPress={handleNextPage}
        disabled={page === pages || loading}
        style={styles.arrowButton}>
        <MaterialIcons
          name="arrow-circle-right"
          size={30}
          color={page === pages || loading ? colors.muteColor : colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  loadingIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: colors.primary,
    fontSize: 16,
  },
  arrowButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 50,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    height: 50,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  userComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: colors.muteColor,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  itemText: {
    fontSize: 14,
    color: colors.textColor,
  },
  separator: {
    height: 10,
  },
  descriptionContainer: {
    alignItems: 'center',
    padding: 10,
    width: '80%',
  },
  descriptionText: {
    color: colors.muteColor,
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
