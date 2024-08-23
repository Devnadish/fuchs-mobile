import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Linking, Platform } from "react-native";

const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    };

    getLocation();

    return () => {
      // Clean up if needed
    };
  }, []);

  return location;
};

// Usage example:
// const currentLocation = useCurrentLocation();
// console.log("Current Location:", currentLocation);

export default useCurrentLocation;

export const openGoogleMapsForNavigation = (
  latitude,
  longitude,
  branchName
) => {
  const scheme = Platform.select({
    ios: "maps://app?daddr=",
    android: "google.navigation:q=",
  });

  const latLng = `${latitude},${longitude}`;
  const label = encodeURIComponent(branchName);
  const url = Platform.select({
    ios: `${scheme}${label}&dirflg=d`,
    android: `${scheme}${latLng}`,
  });

  Linking.openURL(url);
};
