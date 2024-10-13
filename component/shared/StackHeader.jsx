// import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router
import colors from '@constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import useIcon from '@hooks/useIcon';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const StackHeader = ({ title }) => {
  const router = useRouter(); // Get the router instance
  const backArrowIcon = useIcon('backArrow');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{backArrowIcon}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

// PropTypes validation for StackHeader component
// StackHeader.propTypes = {
//   title: PropTypes.string.isRequired, // Validate title prop (required)
// };

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: colors.primaryBtn,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.primaryBtn,
  },
});

export default StackHeader;
