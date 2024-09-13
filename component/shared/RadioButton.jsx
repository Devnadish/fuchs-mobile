import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../provider/themeProvider/useThemProvider";

const RadioButton = ({ options, selectedValue, onValueChange }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onValueChange(option.value)}
          style={styles.optionContainer}
        >
          <View
            style={[
              styles.radioCircle,
              {
                borderColor:
                  selectedValue === option.value
                    ? colors.primary
                    : colors.mutedForeground,
              },
            ]}
          >
            {selectedValue === option.value && (
              <View style={styles.selectedDot} />
            )}
          </View>
          <View style={styles.labelContainer}>
            {option.icon && option.icon}
            <Text style={[styles.label, { color: colors.foreground }]}>
              {option.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "blue", // Use colors.primary in the main circle
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  label: {
    fontSize: 16, // Adjust the font size as needed
  },
});

export default RadioButton;
