import React, { useState } from "react";
import {
  View,
  Switch,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import RadioButton from "../../component/shared/RadioButton";
import FormContainer from "../../component/shared/FormContainer";
import { colors } from "../../constants";
import { globalStyle } from "../../styles/globalStyle";

export default function Setting() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={globalStyle.container}>
      <Language />
      <ThemeToggle
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
        toggleSwitch={toggleSwitch}
      />
      <SaveChanges />
      <Logout />
    </View>
  );
}

// Usage
const Language = () => {
  const options = [
    { label: "عربي", value: "ar" },
    { label: "English", value: "en" },
  ];

  const [selectedValue, setSelectedValue] = React.useState(options[1].value);

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  return (
    <FormContainer title={"Language"}>
      <RadioButton
        options={options}
        selectedValue={selectedValue}
        onValueChange={handleSelect}
      />
    </FormContainer>
  );
};
const ThemeToggle = ({ isEnabled, setIsEnabled, toggleSwitch }) => {
  return (
    <FormContainer title={"Theme"}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        {isEnabled ? <Text> Light Mode</Text> : <Text> Dark Mode</Text>}
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </FormContainer>
  );
};

const Logout = () => {
  return (
    <Pressable style={styles.logoutBtn}>
      <Text style={{ color: "white" }}>Logout</Text>
    </Pressable>
  );
};
const SaveChanges = () => {
  return (
    <Pressable style={styles.SaveChangesBtn}>
      <Text style={{ color: "white" }}>Save Changes</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  SaveChangesBtn: {
    backgroundColor: colors.danger,
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});
