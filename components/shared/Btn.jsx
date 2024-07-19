import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
} from "react-native";
import { colors } from "../../constants";

const Btn = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  icon,
  color,
  type,
}) => {
  if (type === "link") {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[styles.linkBtnStyle]}
      >
        <Text style={[styles.linkText]}>{title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.btnStyle, containerStyles]}
      disabled={isLoading}
      // TODO:isloading true change opacity tp 0.7
    >
      <View style={styles.innerView}>
        {icon && (
          <Image
            source={icon}
            resizeMode="contain"
            tintColor={color}
            className="w-6 h-6"
          />
        )}
        <Text style={[styles.text, textStyles]}>{title}</Text>
      </View>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  linkBtnStyle: {
    color: "black",
    padding: 5,
  },
  btnStyle: {
    backgroundColor: colors.primaryBtn,
    padding: 5,
    borderRadius: 5,
    borderColor: colors.primary,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  innerView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // gap: 5,
  },

  text: {
    color: colors.primary,
    fontSize: 14,
  },
  linkText: {
    color: colors.linkColor,
    fontSize: 16,
  },
});
