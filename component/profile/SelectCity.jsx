import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { colors } from "../../constants";
import { getAllCity } from "../../api/cityAPI";
import { Skeleton } from "moti/skeleton"; // Import Moti Skeleton
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { SkeletonCommonProps } from "../../styles/globalStyle";

const SelectCity = ({ setSelectedValue, selectedValue, setVisible }) => {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userLAnguage } = useContext(userAuthContext);

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const cityData = await getAllCity(userLAnguage);
        setCityData(cityData);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCities();
  }, [userLAnguage]);

  const handleOnPressItem = useCallback(
    (item) => {
      const cityName = userLAnguage === "ar" ? item.cityAr : item.cityEn;
      const cityId = item.id;
      setSelectedValue({ city: cityName, cityId: cityId });
      setVisible(false);
    },
    [setSelectedValue, setVisible, userLAnguage]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <Pressable
        onPress={() => handleOnPressItem(item)}
        style={styles.pressableContainer}
      >
        <View style={styles.pressable}>
          <Text style={styles.whyText}>
            {userLAnguage === "ar" ? item.cityAr : item.cityEn}
          </Text>
        </View>
      </Pressable>
    ),
    [handleOnPressItem]
  );

  const renderSkeleton = () => (
    <View style={styles.skeletonItemContainer}>
      <Skeleton
        height={50}
        width={"100%"}
        radius={4}
        show={loading}
        {...SkeletonCommonProps}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={loading ? Array.from({ length: 8 }) : cityData} // Show skeletons or city data
        keyExtractor={(item, index) =>
          loading ? index.toString() : item.id.toString()
        }
        renderItem={loading ? renderSkeleton : renderItem}
        contentContainerStyle={styles.contentContainer}
        extraData={loading} // Ensure FlatList re-renders on loading state change
      />
    </View>
  );
};

export default SelectCity;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  skeletonItemContainer: {
    marginVertical: 5, // Space between skeletons
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.backgroundColor,
  },
  pressableContainer: {
    width: "100%",
  },
  contentContainer: {
    backgroundColor: colors.backgroundColor,
    padding: 10,
    gap: 10,
  },
  separator: {
    height: 10,
  },
});
