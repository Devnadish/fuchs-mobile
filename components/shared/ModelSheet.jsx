import React, { useCallback, useMemo, useRef, forwardRef } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetTextInput,
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
  const snapPoints = useMemo(() => ["25%", "50%", "70%", "90%", "100%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  // renders
  return (
    <View style={styles.container}>
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: colors.white,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            <Text style={styles.containerHeadline}>{props.title}</Text>
            <CloseBtn />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",

    // padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
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
});

export default ModelSheet;
