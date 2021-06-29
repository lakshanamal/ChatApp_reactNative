import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        display: "flex",
        backgroundColor: "#16456D",
      }}
    >
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
