import { Platform, ToastAndroid } from "react-native";

export function showToast(msg = "Request sent successfully!") {
  // if (Platform.OS === "web") {
  //   return;
  // }
  ToastAndroid.show(msg, ToastAndroid.SHORT);
}

export const pingServer = async () => {
  // const ENDPOINT_URL = "http://192.168.1.4:3000/api/ping";
  const ENDPOINT_URL = process.env.EXPO_PUBLIC_ENDPOINT_URL + "/api/ping";
  try {
    const response = await fetch(ENDPOINT_URL, {
      method: "HEAD", // Use the HEAD method for a lightweight request
    });
    if (response.ok) {
      console.log("Server is reachable and responsive");
      return true;
      // Proceed with sending data or other actions
    } else {
      console.log("Server is not reachable or unresponsive");
      return false;
      // Handle the scenario where the server is not reachable
    }
  } catch (error) {
    return false;
    console.error("Error occurred while pinging the server:", error);
    // Handle the error, such as network issues or server unavailability
  }
};

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
