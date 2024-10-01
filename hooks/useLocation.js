import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const getLocation = async () => {
      try {
        const supported = await Location.hasServicesEnabledAsync();
        if (!supported) {
          if (isMounted) {
            Alert.alert(
              "Location Services Disabled",
              "This device does not support location services."
            );
          }
          return;
        }

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          if (isMounted) {
            Alert.alert(
              "Permission Denied",
              "Permission to access location was denied."
            );
          }
          return;
        }

        const locationData = await Location.getCurrentPositionAsync({});
        if (isMounted) {
          setLocation(locationData.coords);
        }
      } catch (error) {
        handleLocationError(error);
      }
    };

    getLocation();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted component
    };
  }, []);

  const handleLocationError = (error) => {
    if (error.code === "E_LOCATION_SERVICES_DISABLED") {
      Alert.alert(
        "Location Services Disabled",
        "Please enable location services in your settings.",
        [
          { text: "Settings", onPress: () => Linking.openSettings() },
          { text: "Cancel", style: "cancel" },
        ]
      );
    } else {
      Alert.alert("Error", "An unexpected error occurred: " + error.message);
    }
  };

  return location;
};

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
