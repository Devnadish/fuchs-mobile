import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import RadioButton from "../../component/shared/RadioButton";
import FormContainer from "../../component/shared/FormContainer";
import { colors } from "../../constants";
import { useTheme } from "../../provider/themeProvider/useThemProvider";
import { MaterialIcons } from "@expo/vector-icons";

import { I18nManager } from "react-native";

export default function Setting() {
  const { colors, theme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const styles = useMemo(() => createStyles(colors), [theme]);

  return (
    <View style={styles.container}>
      <Language styles={styles} />
      <ThemeToggle
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
        styles={styles}
      />
      <SaveChanges styles={styles} />
    </View>
  );
}

const Language = ({ styles }) => {
  const options = [
    { label: "عربي", value: "ar" },
    { label: "English", value: "en" },
  ];

  const [selectedValue, setSelectedValue] = useState(options[1].value);

  const swichLanguage = (lang) => {
    if (lang === "ar") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
    // Reload the app to apply changes
    // RNRestart.Restart();
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  return (
    <FormContainer title={"Language"}>
      <RadioButton
        options={options}
        selectedValue={selectedValue}
        onValueChange={handleSelect}
        styles={styles}
      />
      {/* <Button title="swich" onPress={() => swichLanguage("ar")} /> */}
    </FormContainer>
  );
};

const ThemeToggle = ({ isEnabled, setIsEnabled, styles }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <FormContainer title={"Theme"}>
      <View style={styles.themeToggleContainer}>
        <TouchableOpacity
          onPress={() => {
            toggleTheme();
            setIsEnabled((prev) => !prev);
          }}
          style={styles.themeBtn}
        >
          <Text style={styles.text}>{theme}</Text>
          <MaterialIcons
            name={theme === "dark" ? "dark-mode" : "light-mode"}
            size={24}
            color={colors.primaryForeground}
          />
        </TouchableOpacity>
      </View>
    </FormContainer>
  );
};

const SaveChanges = ({ styles }) => {
  return (
    <Pressable style={styles.saveChangesBtn}>
      <Text style={styles.text}>Save Changes</Text>
    </Pressable>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      padding: 20,
      backgroundColor: colors.background,
    },
    themeToggleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      justifyContent: "center",
      width: "100%",
    },
    themeBtn: {
      padding: 10,
      borderRadius: 5,
      width: "80%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 5,
      // borderWidth: 1,
    },
    saveChangesBtn: {
      backgroundColor: colors.destructive,
      padding: 10,
      borderRadius: 5,
      width: "80%",
      alignItems: "center",
      justifyContent: "center",
    },
    saveChangesText: {
      color: colors.foreground,
    },
    text: {
      color: colors.foreground,
    },
  });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 20,
//     padding: 20,
//     backgroundColor: colors.backgroundColor,
//   },
//   themeToggleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 20,
//     justifyContent: "center",
//     width: "100%",
//   },
//   themeBtn: {
//     padding: 10,
//     borderRadius: 5,
//     width: "80%",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 5,
//     // borderWidth: 1,
//   },
//   saveChangesBtn: {
//     backgroundColor: colors.danger,
//     padding: 10,
//     borderRadius: 5,
//     width: "80%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   saveChangesText: {
//     color: "white",
//   },
// });
