import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SelectYourCity() {
  return (
    <TouchableOpacity
      onPress={() => router.push('/(profile)/city')}
      style={styles.messageContainer}>
      <Text style={styles.message}>Select Your City To Save Your Time</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
