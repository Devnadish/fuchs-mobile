import React, { memo, useEffect, useRef } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { colors } from "@constants";

const ShowModal = memo(
  ({ visible, setVisible, header, children, height = "80%" }) => {
    const translateY = useSharedValue(height === "80%" ? 1000 : 0); // Start off-screen

    useEffect(() => {
      if (visible) {
        translateY.value = withTiming(0, {
          duration: 300,
          easing: Easing.out(Easing.ease),
        });
      } else {
        translateY.value = withTiming(1000, {
          duration: 300,
          easing: Easing.in(Easing.ease),
        });
      }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
        height: height,
      };
    });

    return (
      <Modal
        visible={visible}
        animationType="none" // We will handle animations with Reanimated
        transparent={true}
        onRequestClose={() => setVisible(false)} // For Android back button support
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.backDrop} />
        </Pressable>
        <Animated.View style={[styles.bodyStyle, animatedStyle]}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerText}>{header}</Text>
            <Pressable
              onPress={() => setVisible(false)}
              style={styles.closeButton}
              accessibilityLabel="Close modal"
            >
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
          </View>
          <View style={styles.childrenStyle}>{children}</View>
        </Animated.View>
      </Modal>
    );
  }
);

// Styles
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backDrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.muteColor,
    paddingHorizontal: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
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
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  childrenStyle: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.backgroundColor,
  },
});

export default ShowModal;
