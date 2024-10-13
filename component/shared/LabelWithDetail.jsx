import colors from '@constants/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Reusable styles for text components

const LabelWithDetail = ({ label, detail }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label} : </Text>}
      <Text style={styles.detail}>{detail} </Text>
    </View>
  );
};

export default LabelWithDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'auto',
    textTransform: 'capitalize',
    color: colors.textColor,
    marginBottom: 5,
    marginRight: 5,
  },
  detail: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'auto',
    textTransform: 'capitalize',
    color: colors.textColor,
  },
});
