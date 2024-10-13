// ChangeProfileStyles.js
import { StyleSheet } from 'react-native';
import { colors } from '@constants';

const styles = StyleSheet.create({
  Loadercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  ChangeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: colors.white,
    gap: 20,
  },
  imageContainerAndButton: {
    alignItems: 'center',
    gap: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '45%',
  },
  changeButton: {
    backgroundColor: 'transparent',
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderColor: colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.primary,
  },
});

export default styles;
