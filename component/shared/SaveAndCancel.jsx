import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import RNBtn from './RNBtn';
import { router } from 'expo-router';
import { colors } from '@constants';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

export default function SaveAndCancel({ handleSubmit, indcator }) {
  const { t } = useTranslation();
  const translations = useMemo(
    () => ({
      edit: t('editBtn'),
      proccessing: t('proccessing'),
    }),
    [t]
  );
  return (
    <View style={styles.buttonContainer}>
      <RNBtn
        title={translations.edit}
        handlePress={handleSubmit}
        containerStyles={styles.submitButton}
        isLoading={indcator}
        loadingText={translations.proccessing}
        icon={<FontAwesome name="send" size={20} color={colors.white} />}
      />
      {/* <RNBtn
        title="Cancel"
        handlePress={() => router.back()}
        containerStyles={styles.cancelButton}
        icon={<MaterialIcons name="cancel" size={20} color={colors.white} />}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  submitButton: {
    width: '100%',
    backgroundColor: colors.green,
    height: 40,
  },
  cancelButton: {
    width: '40%',
    backgroundColor: colors.danger,
    height: 40,
  },
});
