import React, { useState, memo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { colors } from "@constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
);

const Label = memo(({ label, required }) => (
  <View style={styles.labelContainer}>
    <Text style={styles.label}>{label}</Text>
    {required && <Text style={styles.required}>Required</Text>}
  </View>
));

const Input = ({ label, text, setText, required = false, icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        {label && <Label label={label} required={required} />}
        <View style={styles.inputContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <TextInput
            style={[
              styles.input,
              {
                borderColor: isFocused ? colors.primary : colors.borderColor,
                borderWidth: isFocused ? 1 : 0,
              },
            ]}
            {...props}
            onChangeText={setText}
            value={text}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {text?.length > 0 && (
            <TouchableOpacity
              onPress={() => setText("")}
              style={styles.clearButton}
            >
              <MaterialCommunityIcons
                name="close-circle"
                size={24}
                color={colors.borderColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 5,
  },
  label: {
    fontWeight: "300",
    color: colors.textColor,
  },
  required: {
    color: colors.danger,
    fontSize: 9,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    alignItems: "center",
    gap: 5,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: colors.backgroundColor,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    height: 40,
    flexGrow: 1,
    backgroundColor: colors.backgroundColor,
    borderWidth: 1,
  },
  clearButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
});

export default Input;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import { colors } from "@constants";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const DismissKeyboard = ({ children }) => (
//   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//     {children}
//   </TouchableWithoutFeedback>
// );

// const Input = ({ label, text, setText, required = false, icon, ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <DismissKeyboard>
//       <View style={styles.container}>
//         {label && <Label label={label} required={required} />}
//         <View style={styles.inputContainer}>
//           {icon && <View style={styles.iconContainer}>{icon}</View>}
//           <TextInput
//             style={[
//               styles.input,
//               {
//                 borderColor: isFocused ? colors.primary : colors.borderColor,
//                 borderWidth: isFocused ? 1 : 0,
//               },
//             ]}
//             {...props}
//             onChangeText={setText}
//             value={text}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//           />
//           {text && (
//             <TouchableOpacity
//               onPress={() => setText("")}
//               style={styles.clearButton}
//             >
//               <MaterialCommunityIcons
//                 name="close-circle"
//                 size={24}
//                 color={colors.borderColor}
//               />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </DismissKeyboard>
//   );
// };

// const Label = ({ label, required }) => (
//   <View style={styles.labelContainer}>
//     <Text style={styles.label}>{label}</Text>
//     {required && <Text style={styles.required}>Required</Text>}
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     // width: Dimensions.get("screen").width * 0.9,
//     width: "100%",
//     padding: 4,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   labelContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     gap: 5,
//   },
//   label: {
//     fontWeight: "300",
//     color: colors.textColor,
//   },
//   required: {
//     color: colors.danger,
//     fontSize: 9,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     width: "100%",
//     height: 40,
//     alignItems: "center",
//     gap: 5,
//   },
//   iconContainer: {
//     padding: 10,
//     backgroundColor: colors.backgroundColor,
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   input: {
//     padding: 10,
//     height: 40,
//     flexGrow: 1,
//     backgroundColor: colors.backgroundColor,
//     borderWidth: 1,
//   },
//   clearButton: {
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     width: 40,
//   },
// });

// export default Input;
