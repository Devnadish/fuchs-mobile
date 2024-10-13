// import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from '@constants';
import { Link } from 'expo-router';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const RNLink = ({ title, containerStyles, textStyles, href }) => {
  return (
    <Link href={href} asChild style={styles.linkStyle}>
      <TouchableOpacity activeOpacity={0.7} style={[styles.btnStyle, containerStyles]}>
        <View style={styles.innerView}>
          <Text style={[styles.text, textStyles]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

// // PropTypes validation for Xlink component
// Xlink.propTypes = {
//   title: PropTypes.string.isRequired, // Validate title prop
//   containerStyles: PropTypes.object, // Validate containerStyles prop (optional)
//   textStyles: PropTypes.object, // Validate textStyles prop (optional)
//   href: PropTypes.string.isRequired, // Validate href prop
// };

export default RNLink;

const styles = StyleSheet.create({
  linkStyle: {
    flexGrow: 1,
  },
  btnStyle: {
    backgroundColor: colors.primaryBtn,
    borderRadius: 5,
    borderColor: colors.primary,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  text: {
    color: colors.backgroundColor,
    fontSize: 14,
  },
});
