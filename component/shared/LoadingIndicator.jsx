import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

const LoadingIndicator = ({ message }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#0000ff" />
      {message && <Text style={styles.loadingText}>{message}</Text>}
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: semi-transparent background
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000', // Adjust color as needed
  },
});
