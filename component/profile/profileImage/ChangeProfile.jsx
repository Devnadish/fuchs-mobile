// ChangeProfile.js
import { View, Text, ActivityIndicator } from 'react-native';
import ExpoImage from '@component/shared/ExpoImage';
import RNBtn from '@component/shared/RNBtn';
import useChangeProfile from '@component/profile/profileImage/useChangeProfile';
import styles from '@styles/ChangeProfileStyles';
import colors from '@constants/colors';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import { useTranslation } from 'react-i18next';

export default function ChangeProfile({ setShowModal }) {
  const { contextUpdateLoading } = useUserAuth();
  const { pickImage, handleUpload, loadFromGallery, avatar, isUpdating } =
    useChangeProfile(setShowModal);

  return (
    <View style={styles.container}>
      {contextUpdateLoading && <Header />}
      <ImagePicker avatar={avatar} pickImage={pickImage} loadFromGallery={loadFromGallery} />
      <SaveButton
        handlePress={handleUpload}
        isUpdating={isUpdating}
        loadFromGallery={loadFromGallery}
      />
    </View>
  );
}

const Header = () => <Text style={styles.header}>Update Profile Image</Text>;

const ImagePicker = ({ avatar, pickImage, loadFromGallery }) => (
  <View style={styles.imageContainerAndButton}>
    <View style={styles.imageContainer}>
      <ExpoImage image={avatar} style={styles.image} />
    </View>
    <ChangeButton handlePress={pickImage} loadFromGallery={loadFromGallery} />
  </View>
);

const SaveButton = ({ handlePress, isUpdating, loadFromGallery }) => {
  const { t } = useTranslation();
  return (
    <RNBtn
      title={t('editBtn')}
      handlePress={handlePress}
      containerStyles={styles.button}
      loadingText={t('proccessing')}
      isLoading={isUpdating}
      disabled={isUpdating || loadFromGallery}
    />
  );
};

const ChangeButton = ({ handlePress, loadFromGallery }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.ChangeButton}>
      {loadFromGallery ? (
        <LoadingIndicator />
      ) : (
        <RNBtn
          title={t('changeImage')}
          handlePress={handlePress}
          containerStyles={styles.changeButton}
          textStyles={{ color: colors.primary }}
        />
      )}
    </View>
  );
};

const LoadingIndicator = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.Loadercontainer}>
      <Text style={{ color: colors.primary }}>{t('loading')}</Text>
      <ActivityIndicator size="small" color={colors.primary} />
    </View>
  );
};

// Assign displayName for debugging
ChangeProfile.displayName = 'ChangeProfile';
Header.displayName = 'Header';
ImagePicker.displayName = 'ImagePicker';
SaveButton.displayName = 'SaveButton';
ChangeButton.displayName = 'ChangeButton';
LoadingIndicator.displayName = 'LoadingIndicator';
