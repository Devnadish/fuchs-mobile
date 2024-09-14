import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import { colors } from "../../../constants";
import Container from "../../../component/shared/Containner";
import { FontAwesome } from "@expo/vector-icons";
import { getServiceGiftFromDb } from "../../../api/getServiceGift";
import ExpoImage from "../../../component/shared/ExpoImage";
import ScreenBarTitle from "../../../component/shared/ScreenBarTitle";
import ServiceDetail from "../../../component/home/serviceCard/ServiceDetail";
import { Skeleton } from "moti/skeleton";
import { SkeletonCommonProps } from "../../../styles/globalStyle";

const MemoizedServiceDetail = React.memo(ServiceDetail);

export default function FreeGift() {
  const [gift, setGift] = useState([]);
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const { serviceId, userLanguage } = params;

  const fetchData = async (language, id) => {
    setLoading(true);
    try {
      const data = await getServiceGiftFromDb(language, id);
      setGift(data);
    } catch (error) {
      console.error("Error fetching gifts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(userLanguage, serviceId);
  }, [userLanguage, serviceId]);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <ExpoImage
          image={item.image}
          style={styles.image}
          height={150}
          width={150}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>
            {userLanguage === "ar" ? item.giftAr : item.giftEn}
          </Text>
        </View>
      </View>
    ),
    [userLanguage]
  );

  const serviceTitle =
    userLanguage === "ar"
      ? gift?.serviceInformation?.titleAr
      : gift?.serviceInformation?.titleEn;
  const serviceDescription =
    userLanguage === "ar"
      ? gift?.serviceInformation?.descriptionAr
      : gift?.serviceInformation?.descriptionEn;

  return (
    <Container>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerTitle: () => <ScreenBarTitle title={"Free Gift"} />,
          headerShadowVisible: true,
          headerStyle: { backgroundColor: colors.backgroundColor },
          headerTintColor: colors.primaryBtn,
          headerTitleAlign: "center",
        }}
      />
      {loading ? (
        <Skeleton
          height={100}
          width={"100%"}
          radius={10}
          {...SkeletonCommonProps}
        />
      ) : (
        <MemoizedServiceDetail
          Title={serviceTitle}
          description={serviceDescription}
          icon={<FontAwesome name="gift" size={48} color={colors.primaryBtn} />}
        />
      )}
      <View style={styles.container}>
        <FlatList
          data={gift.serviceInfo}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 5 },
  itemContainer: {
    width: "100%",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: colors.white,
  },
  listContainer: {
    gap: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  itemTextContainer: {
    position: "absolute",
    height: "30%",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: colors.textColor,
    opacity: 0.7,
  },
});
