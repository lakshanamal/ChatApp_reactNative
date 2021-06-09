import React from "react";
import { Text, View } from "../components/Themed";
import { useRoute } from "@react-navigation/native";
const ChatRoomScreen = () => {
  const route = useRoute();
  return <Text>Chat Room</Text>;
};

export default ChatRoomScreen;
