import React, { useContext } from "react";
import { View } from "react-native";
import BookingMapView from "../../../components/booking/BookingMapView";
import { UserLocationContext } from "../../../provider/UserLocationProvider/UserLocationProvider";

export default function App() {
  const { location } = useContext(UserLocationContext);
  return (
    <View>
      <BookingMapView />
    </View>
  );
}
