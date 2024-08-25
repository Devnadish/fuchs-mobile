import { Pressable, StyleSheet, Text, View, Linking } from "react-native";
import React, { useCallback } from "react";
import { colors } from "../../../constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useCurrentLocation, {
  openGoogleMapsForNavigation,
} from "../../../hooks/useLocation";
import { showToast } from "../../../lib/nadish";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
const BranchActions = React.memo(
  ({ lat, long, brid, branchName, phoneNumber }) => {
    const currentLocation = useCurrentLocation();
    const handleRatePress = useCallback(() => {
      showToast(`Rate button pressed for ${brid}`);
    }, []);

    const handleComplaine = () => {
      showToast(`comaplne button pressed for ${brid}`);
    };
    const handleGoPress = useCallback(() => {
      if (currentLocation) {
        const { latitude, longitude } = currentLocation;
        openGoogleMapsForNavigation(latitude, longitude, branchName);
      }
    }, [currentLocation, branchName]);

    const handleBookingPress = useCallback(() => {
      showToast("Booking button pressed");
    }, []);

    const handleCall = () => {
      Linking.openURL(`tel:${phoneNumber}`);
    };

    return (
      <View style={styles.container}>
        <Actions
          icon={<FontAwesome name="road" size={24} color={colors.primary} />}
          title="Go"
          handleAction={handleGoPress}
        />

        <Actions
          icon={
            <FontAwesome name="calendar" size={24} color={colors.primary} />
          }
          title="Booking"
          handleAction={handleBookingPress}
        />

        <Actions
          icon={<FontAwesome name="phone" size={24} color={colors.primary} />}
          title="Call"
          handleAction={handleCall}
        />
        <Actions
          icon={
            <MaterialIcons name="star-rate" size={24} color={colors.yellow} />
          }
          title="Rate"
          handleAction={handleRatePress}
        />

        <Actions
          icon={<Entypo name="emoji-sad" size={24} color={colors.danger} />}
          title="Complain "
          handleAction={handleComplaine}
        />
      </View>
    );
  }
);

const Actions = ({ icon, title, handleAction }) => {
  return (
    <View style={styles.actionContainer}>
      <Pressable style={[styles.button]} onPress={handleAction}>
        <View style={styles.buttonIcons}>{icon}</View>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    alignItems: "center",
    justifyContent: "center",
    // gap: 3,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 5,
  },
  button: {
    // backgroundColor: colors.backgroundColor,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    // borderWidth: 1,
    borderColor: colors.borderColor,
    gap: 3,
  },
  text: {
    color: colors.textColor,
    fontSize: 10,
  },
  buttonIcons: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BranchActions;
