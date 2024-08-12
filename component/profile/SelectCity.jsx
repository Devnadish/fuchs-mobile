import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { memo, useCallback, useState } from "react";
import FormContainer from "../shared/FormContainer";
import { enCitys } from "../../constants/City";
import ShowModal from "../shared/ShowModal";
import { Entypo } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../../constants";

const SelectCity = ({ selectedValue, setSelectedValue }) => {
  const [visible, setVisible] = useState(false);

  const memoriedCallBack = useCallback((item) => {
    setSelectedValue(item.label);
    setVisible(false);
  }, []);

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

  return (
    <FormContainer
      title={"Change City"}
      icon={<Feather name="edit" size={24} color={colors.muteColor} />}
    >
      <Pressable onPress={() => setVisible(true)} style={styles.pressTochange}>
        <Text>{selectedValue}</Text>
        <Entypo name="select-arrows" size={24} color={colors.muteColor} />
      </Pressable>
      <ShowModal
        visible={visible}
        setVisible={setVisible}
        header={"Selct Your City"}
      >
        <View style={{ marginBottom: 30 }}>
          <FlatList
            data={enCitys}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RenderItem item={item} handleOnPressItem={memoriedCallBack} />
            )}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </ShowModal>
    </FormContainer>
  );
};

export default SelectCity;
const styles = StyleSheet.create({
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
  pressTochange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  pressapleContainer: {
    width: "100%",
  },
  contentContainer: {
    backgroundColor: colors.backgroundColor,
    padding: 10,
  },
  itemStyle: {
    height: 50, // Set the desired height for the items
  },
});
