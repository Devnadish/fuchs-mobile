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
import { memo, useCallback, useState } from "react";
// import { colors } from "../../constants";
import { enCitys } from "../../constants/City";
import { router, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../constants";

export default function City() {
  return (
    <View style={{ flex: 1 }}>
      {/* Cancel button in backdraw */}
      <Pressable style={{ flex: 1 }} onPress={() => router.back()}>
        <View />
      </Pressable>
      <Pressable style={{ flex: 1 }} onPress={() => setVisible(false)}>
        <View style={styles.backDrop} />
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
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Select City</Text>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="closecircle" size={24} color={colors.muteColor} />
          </Pressable>
        </View>

        {/* Show content */}
        <ShowContent />
      </BlurView>
    </View>
  );
}

const ShowContent = () => {
  const router = useRouter();
  const data = enCitys;

  const [searchText, setSearchText] = useState("");
  const [flitteredData, setFlitteredData] = useState([]);

  // handle search text
  const handleOnChange = (value) => {
    setSearchText(value);
    const filteredData = data.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    setFlitteredData(filteredData);
  };

  // handle select city whene click on city
  const memoriedCallBack = useCallback((item) => {
    router.back();
    router.setParams({ selectedCity: item.label, selectedCityId: item.id });
  }, []);

  // clear the search and repopulate the data
  const handleRefresh = () => {
    setFlitteredData([]);
    setSearchText("");
  };

  return (
    <View>
      {/* the search input */}
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

      {/* city list */}
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
    backgroundColor: colors.mu,
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
