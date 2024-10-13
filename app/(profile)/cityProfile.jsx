import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import ShowModal from '@component/shared/ShowModal';
import SelectCity from '@component/profile/cityProfile/SelectCity';
import Container from '@component/shared/Containner';
import { colors } from '@constants';
import useCity from '@component/profile/cityProfile/useCity';
import RNBtn from '@component/shared/RNBtn';
import LabelWithDetail from '@component/shared/LabelWithDetail';
import useIcon from '@hooks/useIcon';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export default function City() {
  const { t } = useTranslation();
  const translations = useMemo(
    () => ({
      title: t('cityProfile_title'),
      City: t('City'),
      editBtn: t('editBtn'),
    }),
    [t]
  );
  const { city, setCity, cityId, setCityId, updLoading, showModal, setShowModal, handleSubmit } =
    useCity();

  return (
    <Container>
      <View style={styles.container}>
        <Stack.Screen options={{ title: translations.title, headerShown: true }} />
        <UpdateCityInstruction />
        <View style={styles.dataContainer}>
          <LabelWithDetail label={translations.City} detail={city} />
          <RNBtn
            title={translations.title}
            handlePress={() => setShowModal(true)}
            containerStyles={styles.button}
            textStyles={{ color: colors.primary, fontSize: 18 }}
            icon={useIcon('city', 24, colors.muteColor)}
          />
        </View>

        <RNBtn
          title={translations.editBtn}
          handlePress={handleSubmit}
          containerStyles={styles.saveButton}
          textStyles={{ color: colors.white }}
        />
      </View>

      <ShowModal visible={showModal} setVisible={setShowModal} header={'Change City'}>
        <SelectCity setCity={setCity} setCityId={setCityId} setVisible={setShowModal} />
      </ShowModal>
    </Container>
  );
}

const styles = StyleSheet.create({
  dataContainer: {
    width: '100%',
    gap: 15,
    padding: 20,
  },
  button: {
    backgroundColor: 'transparent',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  saveButton: {
    marginTop: 10,
  },
});

function UpdateCityInstruction() {
  return (
    <Text style={styles.instructionText}>
      When you select your city, it helps us provide possibilities tailored just for you! By
      choosing your city, you can easily discover local branches that offer exciting deals and
      services right in your area.
    </Text>
  );
}
