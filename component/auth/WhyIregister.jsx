import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { whyilogin } from "../../constants/textData/whyilogin";
import { colors } from "../../constants";
import ShowModal from "../shared/ShowModal";
import { globalStyle } from "../../styles/globalStyle";
export default function WhyIregister() {
  //  const headerHeight = useHeaderHeight();
  const [visible, setVisible] = useState(false);

  const infoModelSheet = useRef(null);
  const handleOpenPress = () => {
    infoModelSheet.current?.present();
    setVisible(true);
  };

  return (
    <View style={{ height: 48, justifyContent: "center" }}>
      <Pressable onPress={handleOpenPress}>
        <View style={styles.whyBtn}>
          <AntDesign name="infocirlce" size={24} color={colors.muteColor} />
        </View>
      </Pressable>

      <ShowModal
        visible={visible}
        setVisible={setVisible}
        header={"Why Should I Sign Up?"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <Text style={globalStyle.paragraph}>{whyilogin}</Text>
          </View>
        </ScrollView>
      </ShowModal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  scroll: {
    alignItems: "center",
    justifyContent: "center",
  },
  whyBtn: {
    width: 40,
    borderColor: colors.muteColor,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
