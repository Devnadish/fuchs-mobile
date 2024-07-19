import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "../../util/MapViewStyle.json";

import { useEffect, useState } from "react";
import googleApi from "../../util/googleApi";
import { UserLocationContext } from "../../provider/UserLocationProvider/UserLocationProvider";

export default function BookingMapView() {
  const { location, setLocation } = useContext(UserLocationContext);

  const GoHome = () => {
    router.push("/LoginPage");
  };
  const goHomePagee = () => {
    router.push("/home");
  };
  const GoRegister = () => {};

  // console.log(location);

  // console.log({ location });
  // 21.540571161178363, 39.205667847890616;

  // useEffect(() => {
  //   location && getNearLocations();
  // }, [location]);

  const getNearLocations = () => {
    data = {
      includedTypes: ["restaurant"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 5000.0,
        },
      },
    };
    googleApi.NewNearByplace(data).then((res) => {
      console.log(res.data);
    });
  };

  return (
    location?.latitude && (
      <View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapViewStyle}
          region={{
            // latitude: 21.540571161178363,
            // longitude: 39.205667847890616,
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
          // showsUserLocation={true}
        >
          <Marker
            coordinate={{
              // latitude: 21.540571161178363,
              // longitude: 39.205667847890616,
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            <Image
              source={require("../../assets/map/carMarker.png")}
              style={{ width: 60, height: 60 }}
            />
          </Marker>
        </MapView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
