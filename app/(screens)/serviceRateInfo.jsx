import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
// import { colors } from "../../constants";
import { globalStyle } from "../../styles/globalStyle";
import BarHeader from "../../component/shared/BarHeader";
import Container from "../../component/shared/Containner";

export default function ServiceRate() {
  const params = useLocalSearchParams();
  const { serviceId } = params;
  console.log({ serviceId });
  return (
    <Container>
      <View style={globalStyle.container}>
        <BarHeader title={"Service Rateing"} />
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>{serviceId} </Text>
      </View>
    </Container>
  );
}
