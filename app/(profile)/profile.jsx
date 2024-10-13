import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import Input from '@component/shared/Input';
import SaveAndCancel from '@component/shared/SaveAndCancel';
import { colors } from '@constants';
import { borderRadius } from '@styles/globalStyle';
import useProfile from '@component/profile/profile/useProfile';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { t } = useTranslation();
  const translations = useMemo(
    () => ({
      title: t('profile'),
      name: t('Name'),
      email: t('Email'),
      // Placeholder keys
      placeholderName: t('placeholder.name'), // Enter Name
    }),
    [t]
  );
  const { userName, email, setUserName, setEmail, updateLoading, handleUpdate } = useProfile();

  return (
    <>
      <Stack.Screen options={{ title: translations.title, headerShown: true }} />
      <View style={styles.container}>
        <ProfileInstruction />
        <View style={styles.formContainer}>
          <Input
            label={translations.name}
            placeholder={translations.placeholderName}
            text={userName}
            setText={setUserName}
            validationMsg="Enter Valid Name"
            required
            maxLength={150}
            icon={<Feather name="user" size={20} color={colors.muteColor} />}
          />
          <Input
            label={translations.email}
            placeholder="Enter Email"
            text={email}
            setText={setEmail}
            required
            icon={<Feather name="mail" size={20} color={colors.muteColor} />}
          />
        </View>
        <SaveAndCancel handleSubmit={handleUpdate} indicator={updateLoading} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 20,
  },
  formContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    borderRadius: borderRadius,
  },
  instructionText: {
    marginBottom: 20,
  },
});

function ProfileInstruction() {
  return (
    <Text style={styles.instructionText}>
      Providing the correct name and email address when making a booking is crucial for several
      reasons. First and foremost, these details are often used to generate invoices and
      confirmations, which serve as official records of the transaction. If the name or email is
      incorrect, it can lead to confusion and complications, especially when it comes time to verify
      the booking or make changes.
    </Text>
  );
}
