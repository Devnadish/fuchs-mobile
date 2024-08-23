import { ActivityIndicator } from "react-native";
import React from "react";

export default function Loader({ loading }) {
  return <ActivityIndicator animating={loading} color={"blue"} size="large" />;
}
