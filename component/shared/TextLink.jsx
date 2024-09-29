import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { colors } from "@constants";
import { Link } from "expo-router";

const TextLink = ({ title, textStyles, href }) => {
  return (
    <Link href={href} asChild style={styles.container}>
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
  container: { alignItems: "center", padding: 10 },
  text: {
    color: colors.linkColor,
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
    textDecorationColor: colors.linkColor,
    textDecorationStyle: "solid",
    textAlign: "center",
    textTransform: "capitalize",
  },
});
