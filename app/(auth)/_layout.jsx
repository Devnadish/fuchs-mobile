import React from "react";
import { Stack } from "expo-router";

const UserLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Reigster"
        options={{
          headerStyle: {
            backgroundColor: "#f45115",
          },
          headerTintColor: "#f00",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
};

export default UserLayout;
