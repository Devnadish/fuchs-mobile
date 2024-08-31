import { Platform, ToastAndroid } from "react-native";
import Toast from "react-native-toast-message";

export function showToast(msg = "Request sent successfully!") {
  Toast.show({
    text1: msg,
    position: "top",
    visibilityTime: 2000,
    autoHide: true,
    bottomOffset: 50,
    style: {
      width: "100%", // Full width
      backgroundColor: "black",
      borderRadius: 0,
      padding: 16,
    },
    textStyle: {
      color: "white",
      textAlign: "center",
    },
  });
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
export function getTimeElapsed(dateString) {
  // Convert the date string to a Date object
  const date = new Date(dateString);

  // Get the current date and time
  const now = new Date();

  // Calculate the time difference in milliseconds
  const diff = now - date;

  // Convert the time difference to minutes, hours, and days
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Return the formatted string
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}

export function JustDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
