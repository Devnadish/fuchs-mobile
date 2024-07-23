import { ToastAndroid } from "react-native";

export function showToast(msg = "Request sent successfully!") {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
}
