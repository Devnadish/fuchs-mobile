import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { shadowStyle } from "../../styles/globalStyle";
import BarHeader from "../../component/shared/BarHeader";
import Container from "../../component/shared/Containner";
import { useState, useEffect } from "react";
import { getServiceInfoFromDb } from "../../api/getServiceInfo";
import { colors } from "../../constants";

import { Skeleton } from "moti/skeleton";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { delay } from "../../lib/nadish";
import { Entypo } from "@expo/vector-icons";

export default function ServiceInfo() {
  const [info, setInfo] = useState([]);
  const params = useLocalSearchParams();
  const { serviceId, userLanguage } = params;

  const fetchData = async (userLanguage, id) => {
    const data = await getServiceInfoFromDb(userLanguage, id);
    setInfo(data);
  };

  useEffect(() => {
    fetchData(userLanguage, serviceId);
  }, [serviceId]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {userLanguage === "ar" ? item.infoAr : item.infoEn}
      </Text>
    </View>
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
            ? info?.serviceInformation?.titleAr
            : info?.serviceInformation?.titleEn
        }
        description={
          userLanguage === "ar"
            ? info?.serviceInformation?.descriptionAr
            : info?.serviceInformation?.descriptionEn
        }
        image={info?.serviceInformation?.image}
      />
      <View style={styles.container}>
        <FlatList
          data={info.serviceInfo}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </Container>
  );
}

const AboutService = ({ Title, description, image }) => {
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
      {/* <Skeleton height={50} width={"100%"} radius={10} {...SkeletonCommonProps}>
        <Text style={styles.infoDescription}>{description}</Text>
      </Skeleton> */}
      {/* <View style={globalStyle.container}>
        <Image image={image} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
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
    // fontWeight: "bold",
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
  listContainer: {
    gap: 10,
    padding: 10,
  },
});
