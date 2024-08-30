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
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { getServiceGiftFromDb } from "../../api/getServiceGift";
import ExpoImage from "../../component/shared/ExpoImage";

export default function FreeGift() {
  const [gift, setGift] = useState([]);
  const params = useLocalSearchParams();
  const { serviceId, userLanguage } = params;
  console.log(gift);
  const fetchData = async (userLanguage, id) => {
    const data = await getServiceGiftFromDb(userLanguage, id);
    setGift(data);
  };

  useEffect(() => {
    fetchData(userLanguage, serviceId);
  }, [serviceId]);

  const renderItem = ({ item }) => (
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
  );

  return (
    <Container>
      <BarHeader
        title={"Free Gift"}
        icon={<FontAwesome name="gift" size={24} color={colors.primaryBtn} />}
      />
      <AboutService
        Title={
          userLanguage === "ar"
            ? gift?.serviceInformation?.titleAr
            : gift?.serviceInformation?.titleEn
        }
        description={
          userLanguage === "ar"
            ? gift?.serviceInformation?.descriptionAr
            : gift?.serviceInformation?.descriptionEn
        }
        // image={info?.serviceInformation?.image}
      />
      <View style={styles.container}>
        <FlatList
          data={gift.serviceInfo}
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
    marginBottom: 10,
    color: colors.muteColor,
  },
  container: { flex: 1, marginTop: 5 },
  itemContainer: {
    width: "100%",
    // height: 200,
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
    // borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5,
    opacity: 0.7,
  },
});
