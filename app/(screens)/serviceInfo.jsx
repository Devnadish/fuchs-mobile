import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { colors } from '@constants';
import Container from '@component/shared/Containner';
import { Skeleton } from 'moti/skeleton';
import { SkeletonCommonProps } from '@styles/globalStyle';
import useServiceInfo from '@hooks/useServiceInfo';
import { StackScreenOption } from '@constants/headerBarStyle';
import useIcon from '@hooks/useIcon';

export default function ServiceInfo() {
  const params = useLocalSearchParams();
  const { serviceId } = params;
  const { info, loading } = useServiceInfo(serviceId); // Use the custom hook
  const serviceInfoIcon = useIcon('info', 40, colors.primary);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.info}</Text>
      </View>
    ),
    []
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
        {serviceInfoIcon}
      </View>

      <View style={styles.container}>
        {loading ? (
          <Skeleton height={200} width={'100%'} {...SkeletonCommonProps} />
        ) : (
          <FlatList
            data={info}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()} // Ensure id is a string
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            windowSize={5}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 5 },
  itemContainer: {
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 14,
    color: colors.textColor,
  },
  listContainer: {
    padding: 10,
  },
  separator: {
    height: 10, // Space between items
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '80%',
  },
  descriptionText: {
    color: colors.muteColor,
    fontSize: 16,
    textTransform: 'capitalize',
    padding: 10,
  },
});
