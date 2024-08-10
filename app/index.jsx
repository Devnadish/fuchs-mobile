import { Redirect } from "expo-router";

export default function MainApp() {
  return (
    <>
      <Redirect href="/(auth)/home" />
    </>
  );
}
