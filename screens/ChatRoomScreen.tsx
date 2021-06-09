import React from "react";
import { Text, View } from "../components/Themed";
import { useRoute } from "@react-navigation/native";
import ChatRoomData from "../data/Chats";
import { FlatList } from "react-native-gesture-handler";
import ChatMessage from "../components/ChatMessage";

const ChatRoomScreen = () => {
  const route = useRoute();
  return (
    <FlatList
      style={{
        backgroundColor: "white",
      }}
      data={ChatRoomData.messages}
      renderItem={({ item }) => <ChatMessage message={item} />}
    />
  );
};

export default ChatRoomScreen;
