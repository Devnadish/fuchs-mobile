import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { shadowStyle } from "../../styles/globalStyle";
import BarHeader from "../../component/shared/BarHeader";
import Container from "../../component/shared/Containner";
import { useState, useEffect, useCallback } from "react";
import { colors } from "../../constants";
import { Skeleton } from "moti/skeleton";
import { Entypo } from "@expo/vector-icons";
import RateFaces from "../../component/home/RateFaces";
import { getServiceRate } from "../../api/getServiceRate";
import { getTimeElapsed } from "../../lib/nadish";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

let limit = 10;

export default function ServiceRate() {
  const [serviceRate, setServiceRate] = useState([]);
  const [rateCategory, setRateCategory] = useState(5);
  const [page, setPage] = useState(1);
  const params = useLocalSearchParams();
  const { serviceId, userLanguage } = params;

  const fetchRate = useCallback(async () => {
    const data = await getServiceRate(
      serviceId,
      page,
      limit,
      rateCategory,
      userLanguage
    );
    setServiceRate(data);
    console.log(JSON.stringify(data, null, 2));
  }, [serviceId, rateCategory, userLanguage, page]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]); // Only re-fetch when fetchRate changes

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <View style={styles.userComment}>
          <Text style={styles.userNameAndData}>
            {item.userName || "Anonymous"}
          </Text>
          <Text style={styles.userNameAndData}>rate:{item.rate}</Text>
          <Text style={styles.userNameAndData}>
            {getTimeElapsed(item.updatedAt)}
          </Text>
        </View>
        <Text style={styles.itemText}>{item.comment}</Text>
      </View>
    ),
    []
  );

  return (
    <Container>
      <BarHeader
        title={"Service Info"}
        icon={<Entypo name="info" size={24} color={colors.primaryBtn} />}
      />
      <AboutService
        Title={
          userLanguage === "ar"
            ? serviceRate?.serviceInformation?.titleAr
            : serviceRate?.serviceInformation?.titleEn
        }
        description={
          userLanguage === "ar"
            ? serviceRate?.serviceInformation?.descriptionAr
            : serviceRate?.serviceInformation?.descriptionEn
        }
        image={serviceRate?.serviceInformation?.image}
      />
      <RateFaces
        rateCategory={rateCategory}
        setRateCategory={setRateCategory}
      />
      <View style={styles.container}>
        <FlatList
          data={serviceRate.serviceRate}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // Ensure key is a string
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false} // Hide scroll indicator for better UX
          ItemSeparatorComponent={() => <View style={styles.separator} />} // Add separator between items
        />
      </View>
      <Pageination
        page={page}
        setPage={setPage}
        pages={serviceRate.totalPage}
      />
    </Container>
  );
}

const Pageination = ({ page, setPage, pages = 1 }) => {
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };
  return (
    <View style={styles.pageinationContainer}>
      <TouchableOpacity
        onPress={handleNextPage}
        activeOpacity={0.7}
        disabled={page === pages}
        style={styles.arrowButton}
      >
        <MaterialIcons
          name="arrow-circle-left"
          size={30}
          color={page === pages ? colors.muteColor : colors.white}
        />
      </TouchableOpacity>
      <Text style={styles.pageinationText}>
        {page}/{pages}
      </Text>
      <TouchableOpacity
        onPress={handlePreviousPage}
        activeOpacity={0.7}
        disabled={page === 1}
        style={styles.arrowButton}
      >
        <MaterialIcons
          name="arrow-circle-right"
          size={30}
          color={page === 1 ? colors.muteColor : colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const AboutService = ({ Title, description }) => {
  const SkeletonCommonProps = {
    colorMode: "light",
    transition: {
      type: "timing",
      duration: 1500,
    },
    backgroundColor: colors.muteColor,
  };
  return (
    <View style={styles.serviceInfoContainer}>
      <Skeleton
        height={30}
        width={"100%"}
        radius={10}
        {...SkeletonCommonProps}
        show={!Title}
      >
        <Text style={styles.infoTitle}>{Title}</Text>
      </Skeleton>
      <Skeleton
        height={30}
        width={"100%"}
        radius={10}
        {...SkeletonCommonProps}
        show={!description}
      >
        <Text style={styles.infoDescription}>{description}</Text>
      </Skeleton>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  pageinationText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 50,
  },
  pageinationContainer: {
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
  serviceInfoContainer: {
    padding: 20,
    backgroundColor: colors.white,
    marginTop: 50,
    ...shadowStyle,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.textColor,
  },
  infoDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.muteColor,
  },
  container: { flex: 1, marginTop: 5 },
  itemContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: colors.muteColor,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  userNameAndData: {
    fontSize: 12,
    color: colors.muteColor,
  },
  listContainer: {
    padding: 10,
  },
  separator: {
    height: 10, // Space between items
  },
});
