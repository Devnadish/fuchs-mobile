import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { borderRadius, globalStyle } from '@styles/globalStyle';
import colors from '@constants/colors';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import tr from '@hooks/tr';

const Contacts = () => {
  const { contactUs } = tr('contactUs');
  const handleCall = () => {
    Linking.openURL(`tel:${'+201096727333'}`);
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@fosh.io');
  };

  const handleTwitter = async () => {
    const twitterUrl = 'twitter://user?screen_name=foshapp';
    const webUrl = 'https://twitter.com/foshapp';

    try {
      const supported = await Linking.canOpenURL(twitterUrl);
      if (supported) {
        await Linking.openURL(twitterUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error('Error opening Twitter:', error);
      Alert.alert('Error', 'An error occurred while trying to open Twitter.');
    }
  };

  const handleInstagram = async () => {
    const instagramUrl = 'instagram://user?username=foshapp';
    const webUrl = 'https://www.instagram.com/foshapp';

    try {
      const supported = await Linking.canOpenURL(instagramUrl);
      if (supported) {
        await Linking.openURL(instagramUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while trying to open Instagram.' + error);
    }
  };

  return (
    <View style={globalStyle.container}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          color: colors.primary,
          marginBottom: 20,
        }}>
        {contactUs}
      </Text>
      <View style={styles.container}>
        <Action
          icon={<FontAwesome5 name="phone-alt" size={24} color={colors.primary} />}
          title="Call us"
          handle={handleCall}
        />
        <Action
          icon={<Entypo name="email" size={24} color={colors.primary} />}
          title="Waiting Email"
          handle={handleEmail}
        />
        <Action
          icon={<FontAwesome6 name="x-twitter" size={24} color={colors.primary} />}
          title="Follow On Twitter"
          handle={handleTwitter}
        />
        <Action
          icon={<FontAwesome6 name="instagram" size={24} color={colors.primary} />}
          title="Follow On Instagram"
          handle={handleInstagram}
        />
      </View>
    </View>
  );
};

const Action = ({ icon, title, handle }) => {
  return (
    <Pressable
      style={styles.actionContainer}
      onPress={handle}
      accessibilityLabel={title} // Add accessibility label
    >
      {icon}
      <Text style={styles.text}>{title}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    padding: 10,
    borderRadius: borderRadius,
    borderColor: colors.borderColor,
  },
});
