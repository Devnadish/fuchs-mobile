import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '@constants';
import LoginForm from '@component/auth/login/LoginForm';
import RegisteForm from '@component/auth/register/RegisteForm';

export default function Auth() {
  const [isLoginActive, setIsLoginActive] = useState(true); // true for Login, false for Register

  return (
    <View style={styles.container}>
      <View style={styles.panels}>
        <View style={styles.tabContainer}>
          {['Login', 'Register'].map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setIsLoginActive(index === 0)}
              style={isLoginActive === (index === 0) ? styles.activeTab : styles.inActiveTab}>
              <Text>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.contentContainer}>
          {isLoginActive ? <LoginForm /> : <RegisteForm />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panels: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: colors.green,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: colors.green,
  },
  activeTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,

    height: 50,
  },
  inActiveTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundColor,
    height: 50,
  },
  contentContainer: {
    backgroundColor: colors.white,
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: colors.borderColor,
    padding: 20,
    // minHeight: 350,
    maxHeight: '80%',
  },
});

// // import React from 'react';

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { colors } from '@constants';
// import LoginForm from '@component/auth/login/LoginForm';
// import RegisteForm from '@component/auth/register/RegisteForm';

// export default function Auth() {
//   const [activeIndex, setActiveIndex] = useState(0); // 0 for Login, 1 for Register

//   return (
//     <View style={styles.container}>
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           onPress={() => setActiveIndex(0)}
//           style={activeIndex === 0 ? styles.activeTab : styles.inActiveTab}>
//           <Text>Login</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => setActiveIndex(1)}
//           style={activeIndex === 1 ? styles.activeTab : styles.inActiveTab}>
//           <Text>Register</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.contentContainer}>
//         <View style={styles.selectionContainer}>
//           {activeIndex === 0 ? <LoginForm /> : <RegisteForm />}
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.green,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     gap: 40,
//   },
//   selectionContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     padding: 20,
//     height: '100%',
//     // backgroundColor: colors.white,
//     minHeight: 350,
//     maxHeight: 350,
//     maxWidth: 400,
//   },
//   contentContainer: {
//     backgroundColor: colors.white,
//     width: '100%',
//     borderBottomWidth: 0.5,
//     borderColor: colors.borderColor,
//   },
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//     padding: 20,
//     width: '100%',
//     height: '100%',
//     backgroundColor: colors.secondary,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     backgroundColor: colors.green,
//   },
//   activeTab: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.white,
//     borderTopWidth: 2,
//     borderColor: colors.green,
//     height: 50,
//   },
//   inActiveTab: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.backgroundColor,
//     height: 50,
//   },
// });
