import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants";
import { shadowStyle } from "../../styles/globalStyle";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const RateFaces = ({ setRateCategory }) => {
  const faces = [
    {
      icon: <Entypo name="emoji-flirt" size={48} color={colors.green} />,
      rating: 5,
    },
    {
      icon: <Entypo name="emoji-happy" size={48} color={colors.primary} />,
      rating: 4,
    },
    {
      icon: <Entypo name="emoji-neutral" size={48} color={colors.primary} />,
      rating: 3,
    },
    {
      icon: <Entypo name="emoji-sad" size={48} color={colors.primary} />,
      rating: 2,
    },
    {
      icon: <FontAwesome5 name="sad-cry" size={48} color={colors.danger} />,
      rating: 1,
    },
  ];

  return (
    <View style={styles.rateContainer}>
      {faces.map((face) => (
        <FaceButton
          key={face.rating}
          face={face.icon}
          handlePress={() => setRateCategory(face.rating)}
        />
      ))}
    </View>
  );
};

const FaceButton = memo(({ face, handlePress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={styles.faceButton}
    >
      {face}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
    backgroundColor: colors.white,
    ...shadowStyle,
  },
  faceButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RateFaces;
