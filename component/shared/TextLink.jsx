import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { colors } from "../../constants";
import { Link } from "expo-router";

const TextLink = ({ title, textStyles, href }) => {
  return (
    <Link href={href} asChild>
      <TouchableOpacity activeOpacity={0.7}>
        <View>
          <Text style={[styles.text, textStyles]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TextLink;

const styles = StyleSheet.create({
  text: {
    color: colors.linkColor,
    fontSize: 18,
    fontWeight: "500",
  },
});
