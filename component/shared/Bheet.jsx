import React, { useCallback, useMemo, useRef, forwardRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheet,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { colors } from "../../constants";

const CloseBtn = () => {
  const { close } = useBottomSheet();

  return <Button title="Close" onPress={() => close()} />;
};

const Bsheet = forwardRef(function Bsheet(props, ref) {
  // ref
  const snapPoints = useMemo(() => ["25%", "50%", "70%", "90%", "100%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {}, []);

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
      <BottomSheet
        ref={ref}
        index={2}
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
          <Text style={styles.containerHeadline}>{props.title}</Text>
          <BottomSheetTextInput style={styles.input} />
          <CloseBtn />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    padding: 24,
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
});

export default Bsheet;
