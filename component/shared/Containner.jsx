// import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types'; // Import PropTypes
import colors from '@constants/colors';

const Container = ({ children, backgroundColor = colors.backgroundColor }) => {
  return <View style={[styles.content, { backgroundColor }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: colors.green,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

// Define prop types for Container component
// Container.propTypes = {
//   children: PropTypes.node.isRequired, // Validate children prop as required
//   backgroundColor: PropTypes.string, // Validate backgroundColor prop as optional string
// };

export default Container;
