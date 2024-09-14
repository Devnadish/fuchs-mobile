import { Text as RNText, TextProps as RNTextProps } from "react-native";

const MobileText = (props) => {
  return <RNText style={{ textAlign: "left", ...props.style }} {...props} />;
};
export default MobileText;
