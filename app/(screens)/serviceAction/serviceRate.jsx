import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useCallback, memo, useMemo } from "react";
import { colors } from "@constants";
import { Skeleton } from "moti/skeleton";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import RateFaces from "@component/home/RateFaces";
import { getServiceRate } from "@api/getServiceRate";
import { getTimeElapsed } from "@lib/nadish";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ServiceDetail from "@component/home/serviceCard/ServiceDetail";
import Container from "@component/shared/Containner";
import { shadowStyle, SkeletonCommonProps } from "@styles/globalStyle";
import ScreenBarTitle from "@component/shared/ScreenBarTitle";

const MemoizedServiceDetail = memo(ServiceDetail);
const limit = 10;

export default function ServiceRate() {
  const [serviceRate, setServiceRate] = useState([]);
  const [rateCategory, setRateCategory] = useState(5);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const params = useLocalSearchParams();
  const { serviceId, userLanguage } = params;

  const fetchRate = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getServiceRate(
        serviceId,
        page,
        limit,
        rateCategory,
        userLanguage
      );
      setServiceRate(data);
    } catch (error) {
      console.error("Failed to fetch service rates:", error);
    } finally {
      setLoading(false);
    }
  }, [serviceId, rateCategory, userLanguage, page]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  const serviceTitle = useMemo(
    () =>
      userLanguage === "ar"
        ? serviceRate?.serviceInformation?.titleAr
        : serviceRate?.serviceInformation?.titleEn,
    [serviceRate, userLanguage]
  );

  const serviceDescription = useMemo(
    () =>
      userLanguage === "ar"
        ? serviceRate?.serviceInformation?.descriptionAr
        : serviceRate?.serviceInformation?.descriptionEn,
    [serviceRate, userLanguage]
  );

  const handleNextPage = () => {
    if (page < serviceRate.totalPage) {
      setLoadingPage(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setLoadingPage(true);
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    if (loadingPage) {
      fetchRate();
      setLoadingPage(false);
    }
  }, [loadingPage, fetchRate]);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <View style={styles.userComment}>
          <Text style={styles.userNameAndData}>
            {item.userName || "Anonymous"}
          </Text>
          <Text style={styles.userNameAndData}>Rate: {item.rate}</Text>
          <Text style={styles.userNameAndData}>
            {getTimeElapsed(item.updatedAt)}
          </Text>
        </View>
        <Text style={styles.itemText}>{item.comment}</Text>
      </View>
    ),
    []
  );

  const renderSkeleton = () => (
    <View style={styles.skeletonItemContainer}>
      <Skeleton
        height={15}
        width={"80%"}
        radius={8}
        show={loading}
        {...SkeletonCommonProps}
      />
      <Skeleton
        height={30}
        width={"100%"}
        radius={8}
        show={loading}
        {...SkeletonCommonProps}
      />
    </View>
  );

  return (
    <Container>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerTitle: () => <ScreenBarTitle title={"What Clients Say.."} />,
          headerShadowVisible: true,
          headerStyle: { backgroundColor: colors.backgroundColor },
          headerTintColor: colors.primaryBtn,
          headerTitleAlign: "center",
        }}
      />

      <MemoizedServiceDetail
        Title={serviceTitle}
        description={serviceDescription}
        icon={<FontAwesome name="star" size={48} color={colors.yellow} />}
      />
      <RateFaces
        rateCategory={rateCategory}
        setRateCategory={setRateCategory}
      />
      <View style={styles.container}>
        <FlatList
          data={loading ? Array.from({ length: 5 }) : serviceRate.serviceRate}
          renderItem={loading ? renderSkeleton : renderItem}
          keyExtractor={(item, index) =>
            loading ? index.toString() : item.id.toString()
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
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
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </Container>
  );
}

const Pagination = ({
  page,
  pages = 1,
  loading,
  handleNextPage,
  handlePreviousPage,
}) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        onPress={handlePreviousPage}
        activeOpacity={0.7}
        disabled={page === 1 || loading}
        style={styles.arrowButton}
      >
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
        activeOpacity={0.7}
        disabled={page === pages || loading}
        style={styles.arrowButton}
      >
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
  skeletonItemContainer: {
    padding: 15,
    gap: 10,
  },
  loadingIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
  paginationText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 50,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    height: 50,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  userComment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  container: { flex: 1, marginTop: 5 },
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
});
