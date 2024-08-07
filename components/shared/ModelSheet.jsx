import React, { useCallback, useMemo, forwardRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheet,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { colors } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

const CloseBtn = () => {
  const { close } = useBottomSheet();

  return (
    <Pressable style={styles.closeBtn} onPress={() => close()}>
      <View>
        <AntDesign name="closecircle" size={24} color={colors.muteColor} />
      </View>
    </Pressable>
  );
};

const ModelSheet = forwardRef(function ModelSheet(props, ref) {
  // ref
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  const [modalVisible, setModalVisible] = useState(true);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackDrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.8}
        {...props}
      />
    );
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <BottomSheetModal
        ref={ref}
        enableDynamicSizing
        style={{ shadowColor: "#000", elevation: 10 }}
        enablePanDownToClose={false}
        enableOverDrag={false}
        snapPoints={snapPoints}
        index={props.indexOpen || 0} // default 0
        backdropComponent={renderBackDrop}
        onChange={handleSheetChanges}
        {...props}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>{props.title}</Text>
          <CloseBtn />
        </BottomSheetView>

        {props.children}
      </BottomSheetModal>
    </View>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  container: {
    width: "100%",
  },

  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
  closeBtn: {
    width: 24,
    // backgroundColor: colors.gray,
    borderColor: colors.gray,
    height: 24,
    borderRadius: 50,
  },
  containerHeadline: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    color: colors.primary,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the color as needed
  },
});

export default ModelSheet;
