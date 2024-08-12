import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import FormContainer from "../shared/FormContainer";
import { Entypo } from "@expo/vector-icons";
import ShowModal from "../shared/ShowModal";
import { colors } from "../../constants";
import { cars, carsModel } from "../../constants/cars";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { showToast } from "../../lib/nadish";
export default function CarData({ car, carModel, carYear }) {
  const [newCar, setNewCar] = useState({});
  const [newCarModel, setNewCarModel] = useState(carModel);
  const [newCarYear, setNewCarYear] = useState(carYear);
  const [carModelData, setCarModelData] = useState([]); // flter based on car id
  const currentYear = new Date().getFullYear();
  const handleUpdate = () => {
    showToast("Car Updated");
  };
  // get car information as an object
  useEffect(() => {
    const carINformatio = cars.filter((c) => c.label === car);
    setNewCar(carINformatio[0]);
    setNewCarYear(carYear);
  }, []);

  // get car model information as an array of objects based on the car id
  useEffect(() => {
    setCarModelData(carsModel.filter((c) => c.carFactoryId === newCar.id));
  }, [newCar]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 20,
      }}
    >
      <FormContainer
        title={"Change Car"}
        icon={<FontAwesome5 name="car" size={24} color={colors.primary} />}
      >
        <SelectCar
          selectedValue={newCar}
          setSelectedValue={setNewCar}
          data={cars}
        />
        <SelectCarModel
          selectedValue={newCarModel}
          setSelectedValue={setNewCarModel}
          data={carModelData}
        />
        <SelectCarYear
          selectedValue={newCarYear}
          setSelectedValue={setNewCarYear}
          data={[...Array(currentYear - 2000 + 1).keys()].map((x) => x + 2000)}
        />
      </FormContainer>
      <Pressable
        style={styles.loginButton}
        onPress={() => {
          handleUpdate();
        }}
      >
        <Text style={{ color: colors.white }}>Save Changes</Text>
      </Pressable>
    </View>
  );
}

const SelectCarModel = ({ selectedValue, setSelectedValue, data }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <View>
        <Text>Car Model</Text>
        <Pressable
          onPress={() => setVisible(true)}
          style={styles.pressTochange}
        >
          <Text>{selectedValue}</Text>
          <Entypo name="select-arrows" size={24} color={colors.muteColor} />
        </Pressable>
      </View>
      <ShowModal
        visible={visible}
        setVisible={setVisible}
        header={"Selct Your City"}
      >
        <ShowData
          data={data}
          setSelectedValue={setSelectedValue}
          setVisible={setVisible}
        />
      </ShowModal>
    </View>
  );
};

const SelectCar = ({ selectedValue, setSelectedValue, data }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <View>
        <Text>Select Car</Text>
        <Pressable
          onPress={() => setVisible(true)}
          style={styles.pressTochange}
        >
          <Text>{selectedValue?.label}</Text>
          <Entypo name="select-arrows" size={24} color={colors.muteColor} />
        </Pressable>
      </View>
      <ShowModal
        visible={visible}
        setVisible={setVisible}
        header={"Selct Your City"}
      >
        <ShowData
          data={data}
          setSelectedValue={setSelectedValue}
          setVisible={setVisible}
        />
      </ShowModal>
    </View>
  );
};

const SelectCarYear = ({ selectedValue, setSelectedValue, data }) => {
  const [visible, setVisible] = useState(false);
  const memoriedCallBack = useCallback((item) => {
    setSelectedValue(item);
    setVisible(false);
  }, []);

  const RenderItem = memo(({ item, handleOnPressItem }) => {
    return (
      <Pressable
        onPress={() => handleOnPressItem(item)}
        style={styles.pressapleContainer}
      >
        <View style={styles.pressaple}>
          <Text style={styles.whyText}>{item}</Text>
        </View>
      </Pressable>
    );
  });

  return (
    <View>
      <View>
        <Text>Car Year</Text>
        <Pressable
          onPress={() => setVisible(true)}
          style={styles.pressTochange}
        >
          <Text>{selectedValue}</Text>
          <Entypo name="select-arrows" size={24} color={colors.muteColor} />
        </Pressable>
      </View>
      <ShowModal
        visible={visible}
        setVisible={setVisible}
        header={"Selct Your City"}
      >
        <View style={{ marginBottom: 30 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <RenderItem item={item} handleOnPressItem={memoriedCallBack} />
            )}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </ShowModal>
    </View>
  );
};

const ShowData = ({ data, setSelectedValue, setVisible }) => {
  const memoriedCallBack = useCallback((item) => {
    setSelectedValue(item);
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
    <View style={{ marginBottom: 30 }}>
      <FlatList
        data={data}
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

const styles = StyleSheet.create({
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

  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    height: 40,
    backgroundColor: colors.backgroundColor,
    borderRadius: 8,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  loginButton: {
    backgroundColor: colors.danger,
    padding: 10,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  closeButton: {
    backgroundColor: colors.danger,
    padding: 10,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
