import { BlurView } from "expo-blur";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { memo, useCallback, useEffect, useState } from "react";
import { colors } from "../../constants";
import { carsModel } from "../../constants/cars";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function CarModel() {
  const params = useLocalSearchParams();
  return (
    <View style={{ flex: 1 }}>
      {/* Cancel button in backdraw */}
      <Pressable style={{ flex: 1 }} onPress={() => router.back()}>
        <View />
      </Pressable>

      {/* BlurView handle the bottom sheet *screen*/}
      <BlurView
        experimentalBlurMethod="none"
        intensity={90}
        tint="light"
        style={{
          height: "70%",
          width: "100%",
          position: "absolute",
          bottom: 0,
          elevation: 8,
          shadowColor: "#000",
          shadowRadius: 8,
          shadowOpacity: 0.15,
          padding: 16,
          backgroundColor: colors.muteColor,
          borderTopWidth: 1,
          borderColor: colors.borderColor,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {/* Cancel button */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

            marginBottom: 16,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Select Your Car Model
          </Text>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="closecircle" size={24} color={colors.muteColor} />
          </Pressable>
        </View>

        {/* Show content */}
        <ShowContent car={params.selectedCar} carId={params.selectedCarId} />
      </BlurView>
    </View>
  );
}

const ShowContent = ({ car, carId }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [flitteredData, setFlitteredData] = useState([]);

  const FiltterByCar = (carId) => {
    const filterData = carsModel.filter(
      (item) => item.carFactoryId.toString() === carId.toString()
    );
    setData(filterData);
  };

  useEffect(() => {
    FiltterByCar(carId);
  }, [carId]);

  // handle search text
  const handleOnChange = (value) => {
    setSearchText(value);
    const filteredData = data.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    setFlitteredData(filteredData);
  };

  // handle select car whene click on carc
  const memoriedCallBack = useCallback((item) => {
    router.back();
    router.setParams({
      selectedCarModel: item.label,
      selectedCarModelId: item.id,
    });
  }, []);

  // clear the search and repopulate the data
  const handleRefresh = () => {
    setFlitteredData([]);
    setSearchText("");
  };

  return (
    <View>
      {/* the search input */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text>Car Factory :</Text>
        <Text
          style={{
            color: colors.primary,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {car}
        </Text>
      </View>
      <View style={styles.searchInput}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleOnChange(value)}
          value={searchText}
          placeholder="Search"
          clearButtonMode="always"
        />

        <EvilIcons
          name="refresh"
          size={48}
          color={colors.primaryBtn}
          onPress={() => handleRefresh()}
          style={styles.refreshIcon}
        />
      </View>

      {/* Car list */}
      <FlatList
        data={flitteredData.length > 0 ? flitteredData : data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RenderItem item={item} handleOnPressItem={memoriedCallBack} />
        )}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

const RenderItem = memo(({ item, handleOnPressItem }) => {
  return (
    <Pressable
      onPress={() => handleOnPressItem(item)}
      style={styles.pressapleContainer}
    >
      <View style={styles.pressaple}>
        <Text style={styles.whyText}>{item.label}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  pressapleContainer: {
    width: "100%",
  },
  pressaple: {
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
  whyText: {
    marginLeft: 10,
    fontSize: 16,
  },
  contentContainer: {
    backgroundColor: colors.muteColor,
    padding: 10,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: colors.backgroundColor,
    flexGrow: 1,
  },
  searchInput: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 20,
    gap: 10,
  },
  refreshIcon: {
    backgroundColor: colors.primary,
    color: colors.white,
    padding: 2,
    borderRadius: 5,
  },
});
