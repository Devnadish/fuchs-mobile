import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { globalStyle, SkeletonCommonProps } from "@styles/globalStyle";
import { colors } from "@constants";
import ImageSlider from "@component/shared/ImageSlider";
import { getAllServices } from "@api/getAllServices";
import { Skeleton } from "moti/skeleton";
import { useUserAuth } from "@provider/userAuth/userAuthProvider";
import ServiceCards from "@component/home/serviceCard/ServiceCards";
// import ServiceCards from "@component/home/serviceCard/ServiceCards";

const images = [
  "https://i.imgur.com/CzXTtJV.jpg",
  "https://i.imgur.com/OB0y6MR.jpg",
  "https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg",
];

const HomePage = () => {
  const { userLanguage } = useUserAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    try {
      const data = await getAllServices(userLanguage);
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  }, [userLanguage]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <>
      <ImageSlider images={images} />
      <View style={styles.masterContainer}>
        <ScrollView
          contentContainerStyle={globalStyle.scroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
            {loading ? (
              <NoServices loading={loading} />
            ) : services?.length > 0 ? (
              services.map((service) => (
                <ServiceCards
                  key={service.id}
                  title={
                    userLanguage === "ar" ? service.titleAr : service.titleEn
                  }
                  description={
                    userLanguage === "ar"
                      ? service.descriptionAr
                      : service.descriptionEn
                  }
                  id={service.id}
                  userLanguage={userLanguage}
                  rate={service.rate}
                />
              ))
            ) : (
              <NoServices />
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const NoServices = ({ loading }) => (
  <View style={styles.noServicesContainer}>
    {[...Array(3)].map((_, index) => (
      <Skeleton
        key={index}
        height={130}
        width={"100%"}
        radius={10}
        {...SkeletonCommonProps}
        show={loading}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 20,
  },
  masterContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.white,
  },
  noServicesContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
});

export default HomePage;
