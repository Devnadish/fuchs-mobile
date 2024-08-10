import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { colors } from "../../constants";

const Btn = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  loadingText,
  icon,
  color,
  type,
}) => {
  if (type === "link") {
    return (
      <View style={[styles.linkViewStyle, containerStyles]}>
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.7}
          style={[styles.linkBtnStyle]}
        >
          <Text style={[styles.linkText, textStyles]}>{title}</Text>
        </TouchableOpacity>
      </View>
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

        {isLoading ? (
          <Text style={[styles.text, textStyles]}>
            {loadingText || "loading..."}
          </Text>
        ) : (
          <Text style={[styles.text, textStyles]}>{title}</Text>
        )}
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="small"
            className="ml-2"
          />
        )}
      </View>
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
    marginHorizontal: 20,
    height: 50,
  },
  innerView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },

  text: {
    color: colors.backgroundColor,
    fontSize: 14,
  },
  linkText: {
    color: colors.linkColor,
    fontWeight: "bold",
    fontSize: 16,
  },
  linkViewStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
