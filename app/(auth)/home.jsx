import { StyleSheet, View, Dimensions } from "react-native";
import { colors } from "../../constants";
import { showToast } from "../../lib/nadish";
import Btn from "../../component/shared/Btn";
import Xlink from "../../component/shared/Xlink";
import { HeaderImage } from "../../component/auth/HeaderImage";
import Auth from "../../component/auth/Auth";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Auth />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 40,
  },
});
