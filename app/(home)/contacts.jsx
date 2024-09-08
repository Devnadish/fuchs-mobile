import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { borderRadius, globalStyle } from "../../styles/globalStyle";
import colors from "../../constants/colors";

const Contacts = () => {
  // TODO: Fech data from API
  const handleCall = () => {
    Linking.openURL(`tel:${"+201096727333"}`);
  };

  const handleEmail = () => {
    Linking.openURL("mailto:support@fosh.io");
  };

  const handleTwitter = async () => {
    const twitterUrl = "twitter://user?screen_name=foshapp"; // Replace with your Twitter username
    const webUrl = "https://twitter.com/foshapp"; // Replace with your Twitter username

    try {
      const supported = await Linking.canOpenURL(twitterUrl);
      if (supported) {
        await Linking.openURL(twitterUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error("Error opening Twitter:", error);
    }
  };

  const handleInstagram = async () => {
    const instagramUrl = "instagram://user?username=foshapp"; // Replace with your Instagram username
    const webUrl = "https://www.instagram.com/foshapp"; // Replace with your Instagram username

    try {
      const supported = await Linking.canOpenURL(instagramUrl);
      if (supported) {
        await Linking.openURL(instagramUrl);
      } else {
        // If the app is not installed, open the web URL
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while trying to open Instagram.");
    }
  };
  return (
    <View style={globalStyle.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          color: colors.primary,
          marginBottom: 20,
        }}
      >
        Contacts Us..
      </Text>
      <View style={styles.container}>
        <Action
          icon={
            <FontAwesome5 name="phone-alt" size={24} color={colors.primary} />
          }
          title="Call us"
          handle={handleCall}
        />
        <Action
          icon={<Entypo name="email" size={24} color={colors.primary} />}
          title="Waitng Email"
          handle={handleEmail}
        />

        <Action
          icon={
            <FontAwesome6 name="x-twitter" size={24} color={colors.primary} />
          }
          title="Follow On Twitter"
          handle={handleTwitter}
        />
        <Action
          icon={
            <FontAwesome6 name="instagram" size={24} color={colors.primary} />
          }
          title="Follow On instagram"
          handle={handleInstagram}
        />
      </View>
    </View>
  );
};

const Action = ({ icon, title, handle }) => {
  return (
    <Pressable style={styles.actionContainer} onPress={handle}>
      {icon}
      <Text style={styles.text}>{title} </Text>
    </Pressable>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  text: {
    fontSize: 16,
    color: colors.textColor,
  },
  actionContainer: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    padding: 10,
    borderRadius: borderRadius,
    borderColor: colors.borderColor,
  },
});

// const openInstagram = async () => {
//   const instagramUrl = "instagram://user?username=your_username"; // Replace with your Instagram username
//   const webUrl = "https://www.instagram.com/your_username"; // Replace with your Instagram username

//   try {
//     const supported = await Linking.canOpenURL(instagramUrl);
//     if (supported) {
//       await Linking.openURL(instagramUrl);
//     } else {
//       // If the app is not installed, open the web URL
//       await Linking.openURL(webUrl);
//     }
//   } catch (error) {
//     Alert.alert("Error", "An error occurred while trying to open Instagram.");
//   }
// };
