import React from "react";
import { View, Text, Image } from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;
  const user = chatRoom.users[1];
  console.log(chatRoom.lastMessage.content);
  return (
    <View>
      <Image source={{ uri: user.imageUri }} style={styles.avater} />
      <Text style={{ color: "black" }}>{chatRoom.lastMessage.content}</Text>
    </View>
  );
};

export default ChatListItem;
