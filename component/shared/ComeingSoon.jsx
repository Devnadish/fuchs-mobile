import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from './Containner';

export default function ComeingSoon() {
  return (
    <Container>
      <View style={styles.container}>
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>ComeingSoon</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    backgroundColor: 'yellow',
  },
});
