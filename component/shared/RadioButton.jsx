import { TouchableOpacity, View, Text } from "react-native";

const RadioButton = ({ options, selectedValue, onValueChange }) => {
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
              borderColor: selectedValue === option.value ? "blue" : "gray",
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
                  backgroundColor: "blue",
                }}
              />
            )}
          </View>
          <Text style={{ marginLeft: 8 }}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;
