import moment from "moment";
import React from "react";
import { Text } from "react-native";
import { Message } from "../../types";
import { View } from "../Themed";

export type ChatMessageProps = {
  message: Message;
};

const ChatMessage = (props: ChatMessageProps) => {
  const { message } = props;
  return (
    <View style={{ backgroundColor: "white" }}>
      <Text>{message.user.name}</Text>
      <Text>{message.content}</Text>
      <Text>{moment(message.createdAt).fromNow()}</Text>
    </View>
  );
};

export default ChatMessage;
