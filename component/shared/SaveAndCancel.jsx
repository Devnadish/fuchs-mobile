import { StyleSheet, View } from "react-native";
import React from "react";
import Btn from "./Btn";
import { router } from "expo-router";
import { colors } from "@constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SaveAndCancel({ handleSubmit, indcator }) {
  return (
    <View style={styles.buttonContainer}>
      <Btn
        title="Submit"
        handlePress={handleSubmit}
        containerStyles={styles.submitButton}
        isLoading={indcator}
        loadingText="Updating..."
        icon={<FontAwesome name="send" size={20} color={colors.white} />}
      />
      <Btn
        title="Cancel"
        handlePress={() => router.back()}
        containerStyles={styles.cancelButton}
        icon={<MaterialIcons name="cancel" size={20} color={colors.white} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  submitButton: {
    width: "40%",
    backgroundColor: colors.green,
    height: 40,
  },
  cancelButton: {
    width: "40%",
    backgroundColor: colors.danger,
    height: 40,
  },
});
