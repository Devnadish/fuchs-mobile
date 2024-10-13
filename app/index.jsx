import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { useUserAuth } from '@provider/userAuth/userAuthProvider';
import * as Network from 'expo-network';
import { Alert, ActivityIndicator } from 'react-native';

export default function Index() {
  const { isLogin, loading } = useUserAuth();
  const [isConnected, setIsConnected] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  console.log('Current Environment:', process.env.NODE_ENV);

  // Check network connection
  useEffect(() => {
    const checkNetwork = async () => {
      const { isConnected } = await Network.getNetworkStateAsync();
      setIsConnected(isConnected);
      if (!isConnected) {
        Alert.alert('Network Error', 'You are not connected to the internet.');
      }
    };

    checkNetwork();
  }, []);

  // Update initial loading state based on loading prop
  useEffect(() => {
    if (!loading) {
      setInitialLoading(false);
    }
  }, [loading]);

  // Show a loading state until the initial loading is complete
  if (initialLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Loading spinner
  }

  // Redirect based on authentication status and network connection
  if (!isConnected) {
    return <Redirect href="/(error)/network-error" />; // Redirect to an error page if not connected
  }

  return <Redirect href={isLogin ? '/(home)/homeTab' : '/(auth)/home'} />;
  // return <Redirect href={isLogin ? '/(profile)/homeProfile' : '/(auth)/home'} />;
}
