import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { colors } from "@constants";
import Container from "@component/shared/Containner";
import { Skeleton } from "moti/skeleton";
import ScreenBarTitle from "@component/shared/ScreenBarTitle";
import ServiceDetail from "@component/home/serviceCard/ServiceDetail";
import { Entypo } from "@expo/vector-icons";
import { getServiceInfoFromDb } from "@api/getServiceInfo";
import { shadowStyle, SkeletonCommonProps } from "@styles/globalStyle";

const MemoizedServiceDetail = React.memo(ServiceDetail);

export default function ServiceInfo() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const { serviceId, userLanguage } = params;

  const fetchData = async (language, id) => {
    setLoading(true);
    try {
      const data = await getServiceInfoFromDb(language, id);
      setInfo(data);
    } catch (error) {
      console.error("Error fetching service info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(userLanguage, serviceId);
  }, [serviceId, userLanguage]);

  const titleInfo = useMemo(() => {
    return userLanguage === "ar"
      ? info?.serviceInformation?.titleAr
      : info?.serviceInformation?.titleEn;
  }, [info, userLanguage]);

  const description = useMemo(() => {
    return userLanguage === "ar"
      ? info?.serviceInformation?.descriptionAr
      : info?.serviceInformation?.descriptionEn;
  }, [info, userLanguage]);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {userLanguage === "ar" ? item.infoAr : item.infoEn}
        </Text>
      </View>
    ),
    [userLanguage]
  );

  const keyExtractor = (item) => item.id.toString();

  return (
    <Container>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerTitle: () => <ScreenBarTitle title={"Service Info"} />,
          headerShadowVisible: true,
          headerStyle: { backgroundColor: colors.backgroundColor },
          headerTintColor: colors.primaryBtn,
          headerTitleAlign: "center",
        }}
      />

      <MemoizedServiceDetail
        Title={titleInfo}
        description={description}
        icon={<Entypo name="info" size={48} color={colors.primaryBtn} />}
      />

      <View style={styles.container}>
        {loading ? (
          <Skeleton height={200} width={"100%"} {...SkeletonCommonProps} />
        ) : (
          <FlatList
            data={info?.serviceInfo || []}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            windowSize={5}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
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
});
