import { Pressable, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
// import { colors } from "../../constants";
import { globalStyle } from "../../../styles/globalStyle";
import BarHeader from "../../../component/shared/BarHeader";
import Container from "../../../component/shared/Containner";

export default function Booking() {
  const params = useLocalSearchParams();
  const { serviceId } = params;
  return (
    <Container>
      <Stack.Screen options={{ title: `Active Booking`, headerShown: true }} />
      <View style={globalStyle.container}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>{serviceId} </Text>
      </View>
    </Container>
  );
}
