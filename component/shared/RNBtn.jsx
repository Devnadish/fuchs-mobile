import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '@constants';

const RNBtn = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  loadingText = 'Loading...',
  icon,
  type = 'primary',
  ...props
}) => {
  const content = isLoading ? (
    <>
      <ActivityIndicator color="#fff" size="small" />
      <Text style={[styles.text, textStyles]}>{loadingText}</Text>
    </>
  ) : (
    <View style={styles.contentInnerView}>
      {icon}
      {title && <Text style={[styles.text, textStyles]}>{title}</Text>}
    </View>
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.btnStyle, styles[type], containerStyles]}
      disabled={isLoading}
      {...props}>
      <View style={styles.innerView}>{content}</View>
    </TouchableOpacity>
  );
};

RNBtn.propTypes = {
  title: PropTypes.string,
  handlePress: PropTypes.func,
  containerStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  icon: PropTypes.element,
  type: PropTypes.string,
};

const styles = StyleSheet.create({
  contentInnerView: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    gap: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  primary: {
    backgroundColor: colors.primaryBtn,
  },
  secondary: {
    backgroundColor: colors.secondaryBtn,
  },
  innerView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  text: {
    color: colors.backgroundColor,
    fontSize: 14,
    textTransform: 'capitalize',
  },
});

export default RNBtn;

// // import React from 'react';
// import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
// import { colors } from '@constants';
// import PropTypes from 'prop-types'; // Import PropTypes

// const RNBtn = ({
//   title,
//   handlePress,
//   containerStyles,
//   textStyles,
//   isLoading,
//   loadingText = 'Loading...',
//   icon,
//   type = 'primary', // Default type
//   ...props
// }) => {
//   const renderContent = () => {
//     if (isLoading) {
//       return (
//         <>
//           <ActivityIndicator color="#fff" size="small" />
//           <Text style={[styles.text, textStyles]}>{loadingText}</Text>
//         </>
//       );
//     }
//     return (
//       <>
//         {icon && icon}
//         <Text style={[styles.text, textStyles]}>{title}</Text>
//       </>
//     );
//   };

//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       activeOpacity={0.7}
//       style={[styles.btnStyle, containerStyles, styles[type]]} // Apply type styles
//       disabled={isLoading}
//       {...props}>
//       <View style={styles.innerView}>{renderContent()}</View>
//     </TouchableOpacity>
//   );
// };

// // Define prop types for Btn component
// // Btn.propTypes = {
// //   title: PropTypes.string.isRequired, // Validate title prop as required string
// //   handlePress: PropTypes.func.isRequired, // Validate handlePress prop as required function
// //   containerStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // Validate containerStyles prop as optional object or array
// //   textStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // Validate textStyles prop as optional object or array
// //   isLoading: PropTypes.bool, // Validate isLoading prop as optional boolean
// //   loadingText: PropTypes.string, // Validate loadingText prop as optional string
// //   icon: PropTypes.element, // Validate icon prop as optional React element
// //   type: PropTypes.string, // Validate type prop as optional string
// // };

// const styles = StyleSheet.create({
//   btnStyle: {
//     padding: 5,
//     borderRadius: 5,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 50,
//   },
//   primary: {
//     backgroundColor: colors.primaryBtn,
//   },
//   secondary: {
//     backgroundColor: colors.secondaryBtn, // Define secondary button color
//   },
//   link: {
//     backgroundColor: 'transparent', // Define link button style
//   },
//   innerView: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 15,
//   },
//   text: {
//     color: colors.backgroundColor,
//     fontSize: 14,
//     textTransform: 'capitalize',
//   },
//   linkText: {
//     color: colors.linkColor,
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default RNBtn;
