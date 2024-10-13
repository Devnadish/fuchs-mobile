import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import RadioButton from '@component/shared/RadioButton';
import { colors } from '@constants';
import { MaterialIcons } from '@expo/vector-icons';
import SaveAndCancel from '@component/shared/SaveAndCancel';
import { showToast } from '@lib/nadish';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import { UPDATE_USER_SETTING } from '@api/updateUserProfile';
import { router, Stack } from 'expo-router';
import Container from '@component/shared/Containner';
import * as Updates from 'expo-updates';
import { StackScreenOption } from '@constants/headerBarStyle';
import tr from '@hooks/tr';

const options = {
  language: [
    { label: 'عربي', value: 'ar' },
    { label: 'English', value: 'en' },
  ],
  theme: [
    {
      label: 'Light',
      value: 'light',
      icon: <MaterialIcons name={'light-mode'} size={24} color={colors.primaryForeground} />,
    },
    {
      label: 'Dark',
      value: 'dark',
      icon: <MaterialIcons name={'dark-mode'} size={24} color={colors.primaryForeground} />,
    },
  ],
};

export default function Setting() {
  const { userLanguage, userTheme, updateProfile, userMobile } = useUserAuth();
  const [language, setLanguage] = useState(userLanguage);
  const [theme, setTheme] = useState(userTheme);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { settingProfile_title, trlanguage, trtheme } = tr(
    'settingProfile_title',
    'trlanguage',
    'trtheme'
  );

  const handleSubmit = async () => {
    setUpdateLoading(true);
    try {
      const userInformation = {
        mobile: userMobile,
        language: language,
        theme: theme,
      };
      const updateData = await UPDATE_USER_SETTING(userInformation);
      if (updateData) {
        await updateProfile({ userLanguage: language, userTheme: theme });
        showToast('Setting updated successfully');
        promptRestart();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const promptRestart = () => {
    Alert.alert(
      'Settings Updated',
      'Your settings have been updated. Would you like to restart the app now to apply the changes?',
      [
        {
          text: 'Later',
          onPress: () => router.back(),
          style: 'cancel',
        },
        {
          text: 'Restart Now',
          onPress: async () => {
            await Updates.reloadAsync();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: settingProfile_title,
            ...StackScreenOption,
          }}
        />

        <SettingOption
          title={trlanguage}
          options={options.language}
          selectedValue={language}
          onSelect={setLanguage}
        />
        <SettingOption
          title={trtheme}
          options={options.theme}
          selectedValue={theme}
          onSelect={setTheme}
        />
        <SaveAndCancel handleSubmit={handleSubmit} indicator={updateLoading} />
      </View>
    </Container>
  );
}

const SettingOption = ({ title, options, selectedValue, onSelect }) => {
  return (
    <View>
      <Text>{title}</Text>
      <View style={styles.optionsContainer}>
        <RadioButton options={options} selectedValue={selectedValue} onValueChange={onSelect} />
      </View>
    </View>
  );
};

// PropTypes for SettingOption component
// SettingOption.propTypes = {
//   title: PropTypes.string.isRequired,
//   options: PropTypes.array.isRequired,
//   selectedValue: PropTypes.string.isRequired,
//   onSelect: PropTypes.func.isRequired,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.backgroundColor,
    gap: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.white,
  },
});
