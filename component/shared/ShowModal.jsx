import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { Children } from "react";
import { colors } from "../../constants";

export default function ShowModal({
  visible,
  setVisible,
  header,
  children,
  height = "80%",
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <Pressable style={{ flex: 1 }} onPress={() => setVisible(false)}>
        <View style={styles.backDrop} />
      </Pressable>
      <View style={[styles.bodyStyle, { height: height }]}>
        <View style={styles.headerStyle}>
          <Text>{header}</Text>

          <Pressable
            onPress={() => setVisible(false)}
            style={styles.closeButton}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              X
            </Text>
          </Pressable>
        </View>
        <View style={styles.childrenStyle}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    position: "relative",
  },
  headerStyle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.muteColor,
    paddingHorizontal: 20,
  },
  bodyStyle: {
    backgroundColor: "white",
    padding: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,

    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  closeButton: {
    backgroundColor: colors.danger,
    width: 24,
    height: 24,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  childrenStyle: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.backgroundColor,
  },
});
