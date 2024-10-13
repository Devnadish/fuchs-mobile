import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '@constants';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import { router } from 'expo-router';

export default function ActiveBooking() {
  const [active] = useState(true); // Keep only the active state
  const { userMobile } = useUserAuth();

  if (userMobile === 'Gust') {
    return (
      <View style={styles.authContainer}>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={{ color: colors.primary }}>Login</Text>
        </TouchableOpacity>
        <Text>/</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={{ color: colors.green }}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.booking}>
      <Text>V-3</Text>
      {active ? (
        <FontAwesome name="calendar-check-o" size={24} color={colors.danger} />
      ) : (
        <FontAwesome name="calendar-plus-o" size={24} color={colors.primaryBtn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  booking: {
    width: 140,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.muteColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    flexDirection: 'row',
    gap: 3,
  },
  authContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 3,
  },
});
