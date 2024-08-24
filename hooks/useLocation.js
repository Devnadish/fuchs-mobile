import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Linking, Platform } from "react-native";

const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const supported = await Location.hasServicesEnabledAsync();
        if (!supported) {
          console.log("This device does not support location services");
          return;
        }

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      } catch (error) {
        if (error.code === "E_LOCATION_SERVICES_DISABLED") {
          Linking.openSettings();
        } else {
          console.log(error);
        }
      }
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
