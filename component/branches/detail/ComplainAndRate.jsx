import { Pressable, StyleSheet, Text, View, Linking } from "react-native";
import React, { useCallback } from "react";
import { colors } from "../../../constants";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { showToast } from "../../../lib/nadish";
const ComplainAndRate = React.memo(({ brid }) => {
  const handleRatePress = useCallback(() => {
    showToast(`Rate button pressed for ${brid}`);
  }, []);

  const handleComplaine = () => {
    showToast(`comaplne button pressed for ${brid}`);
  };

  return (
    <View style={styles.container}>
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
});

const Actions = ({ icon, title, handleAction }) => {
  return (
    <View style={styles.actionContainer}>
      <Pressable style={[styles.button]} onPress={handleAction}>
        <View style={styles.buttonIcons}>{icon}</View>
      </Pressable>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    alignItems: "center",
    justifyContent: "center",

    gap: 3,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: colors.backgroundColor,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  text: {
    color: colors.textColor,
  },
  buttonIcons: {
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ComplainAndRate;
