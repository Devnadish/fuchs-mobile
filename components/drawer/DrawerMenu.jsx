import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { colors } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const DrawerMenu = (props) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{
          backgroundColor: "#dde3fe",
        }}
      >
        <DrawerItemList {...props} />
        <DrawerItem label="Setting" onPress={() => {}} />

        <View
          style={{
            borderTopColor: colors.primary,
            borderTopWidth: 1,
            padding: 20,
            paddingBottom: 20 + bottom,

            backgroundColor: colors.danger,
          }}
        >
          <Text>Setting</Text>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerMenu;
