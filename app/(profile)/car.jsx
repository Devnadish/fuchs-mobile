import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getUserByMobile } from "../../api/getUserByMobile";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { colors } from "../../constants";
// import CarData from "../../component/profile/CarData"; NO NEED ANY MORE
import { globalStyle } from "../../styles/globalStyle";
import { ifNoCarMessage } from "../../constants/textData/ifNoCarMessage";
import Btn from "../../component/shared/Btn";
import PopupCars from "../../component/cars/PopupCars";

export default function Car() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [visible, setVisible] = useState(false);

  console.log({ selectedCar });
  console.log("-----------------------------");
  console.log({ selectedModel });
  console.log("-----------------------------");
  console.log({ selectedYear });
  console.log("==============================");

  const { userMobile } = useContext(userAuthContext);
  const queryData = { mobile: userMobile };

  const userData = async () => {
    setLoading(true);
    const data = await getUserByMobile(queryData);
    const { car } = data;
    const userCar = {
      car: car?.car,
      carModel: car?.carModel,
      carYear: car?.carYear,
    };

    setUser(userCar);
    setLoading(false);
    console.log(user);
  };

  useEffect(() => {
    userData();
  }, [userMobile]);

  if (!user?.car) {
    return null;
  }

  return (
    <>
      {user?.car ? (
        <ShowCarData
          car={user?.car}
          carModel={user?.carModel}
          carYear={user?.carYear}
          loading={loading}
          visible={visible}
          setVisible={setVisible}
          selectedCar={selectedCar}
        />
      ) : (
        <IfNocar />
      )}

      {visible && (
        <PopupCars
          visible={visible}
          setVisible={setVisible}
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          user={user}
          setUser={setUser}
        />
      )}
    </>
  );
}

const IfNocar = () => {
  return (
    <View style={globalStyle.container}>
      <View style={style.noCar}>
        <ScrollView
          contentContainerStyle={style.noCarScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={globalStyle.paragraph}>{ifNoCarMessage}</Text>
        </ScrollView>
        <Btn
          title="Add Car"
          handlePress={() => {}}
          containerStyles={{ width: "80%", marginTop: 20 }}
        />
      </View>
      <Btn
        title="Save Changes"
        handlePress={() => {}}
        containerStyles={{
          width: "80%",
          marginTop: 20,
          backgroundColor: colors.danger,
        }}
      />
    </View>
  );
};

const ShowCarData = ({
  car,
  carModel,
  carYear,
  loading,
  setVisible,
  selectedCar,
}) => {
  return (
    <View style={globalStyle.container}>
      <View style={[style.noCar, { height: "auto" }]}>
        {loading && (
          <ActivityIndicator
            animating={loading}
            color={colors.primary}
            size="large"
          />
        )}
        {!loading && car && (
          <View style={{ width: "100%", gap: 10 }}>
            <View style={style.carInfo}>
              <Text>Car:</Text>
              <Text> {selectedCar ? selectedCar.carName : car}</Text>
            </View>

            <View style={style.carInfo}>
              <Text>Model:</Text>
              <Text>{carModel}</Text>
            </View>

            <View style={style.carInfo}>
              <Text>Year:</Text>
              <Text>{carYear}</Text>
            </View>
            <Btn
              title="Changes"
              handlePress={() => {
                setVisible(true);
              }}
              containerStyles={{
                width: "80%",
                marginTop: 20,
                backgroundColor: colors.primary,
              }}
            />
          </View>
        )}
      </View>
      {selectedCar && (
        <Btn
          title="Save Changes"
          handlePress={() => {}}
          containerStyles={{
            width: "80%",
            marginTop: 20,
            backgroundColor: colors.danger,
          }}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  noCar: {
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    width: "80%",
    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },
  noCarScroll: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    borderRadius: 10,
    elevation: 5,
  },
  carInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.muteColor,
    borderRadius: 5,
    padding: 10,
  },
});
