import moment from "moment";
import React from "react";
import { Text } from "react-native";
import { Message } from "../../types";
import { View } from "../Themed";
import styles from "./style";
import { useRoute } from "@react-navigation/native";
export type ChatMessageProps = {
  message: Message;
};

const ChatMessage = (props: ChatMessageProps) => {
  const route = useRoute();
  const { currentUser } = route.params;
  const { message } = props;

  const isMyMessage = () => {
    return message.user.id === currentUser.id;
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? "#123858" : "white",
            marginRight: isMyMessage() ? 0 : 50,
            marginLeft: isMyMessage() ? 50 : 0,
          },
        ]}
      >
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content}</Text>
        <Text style={styles.time}>
          {moment(message.createdAt.toDate().toString()).format("h:mm")}
        </Text>
      </View>
    </View>
  );
};

export default ChatMessage;
