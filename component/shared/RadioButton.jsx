import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../provider/themeProvider/useThemProvider";

const RadioButton = ({ options, selectedValue, onValueChange }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onValueChange(option.value)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor:
                selectedValue === option.value ? colors.primary : colors.accent,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedValue === option.value && (
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: colors.primary,
                }}
              />
            )}
          </View>
          <Text style={{ marginLeft: 8, color: colors.foreground }}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;
