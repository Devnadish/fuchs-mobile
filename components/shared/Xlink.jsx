import { Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
import { colors } from "../../constants";
import { Link } from "expo-router";

const Xlink = ({ title, containerStyles, textStyles, href }) => {
  console.log(title);

  return (
    <Link href={href} asChild style={styles.linkStyle}>
      <TouchableOpacity activeOpacity={0.7} style={styles.btnStyle}>
        <View style={styles.innerView}>
          <Text style={[styles.text, textStyles]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default Xlink;

const styles = StyleSheet.create({
  linkStyle: {
    flexGrow: 1,
  },
  btnStyle: {
    backgroundColor: colors.primaryBtn,
    borderRadius: 5,
    borderColor: colors.primary,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  innerView: {
    // width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000000",
    // gap: 5,
  },

  text: {
    color: colors.backgroundColor,
    fontSize: 14,
  },
});
