import React, { useContext, useEffect, useState, useCallback } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import ServiceCard from "../../component/home/ServiceCard";
import { globalStyle } from "../../styles/globalStyle";
import { colors } from "../../constants";
import ImageSlider from "../../component/shared/ImageSlider";
import { getAllServices } from "../../api/getAllServices";

const images = [
  "https://i.imgur.com/CzXTtJV.jpg",
  "https://i.imgur.com/OB0y6MR.jpg",
  "https://farm4.staticflickr.com/3075/3168662394_7d7103de7d_z_d.jpg",
];

const HomePage = () => {
  const [services, setServices] = useState([]);
  const { userLanguage } = useContext(userAuthContext);

  // Fetch all services based on user language
  const fetchServices = useCallback(async () => {
    try {
      const data = await getAllServices(userLanguage);
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  }, [userLanguage]);

  useEffect(() => {
    fetchServices();
  }, [userLanguage]); // Dependency on userLanguage to refetch if it changes

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
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceCard
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
                />
              ))
            ) : (
              <View style={styles.noServicesContainer}>
                <Text>No services available</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
    padding: 20,
  },
});

export default HomePage;
