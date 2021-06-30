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
  const route = useRoute<any>();
  const { currentUser } = route.params;
  const { message } = props;

  const isMyMessage = () => {
    return message.user.id === currentUser.id;
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          isMyMessage() ? styles.messageBox : styles.otherMeassge,
          {
            backgroundColor: isMyMessage() ? "#123858" : "#266aa3",
          },
        ]}
      >
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content}</Text>
        <Text
          style={[
            styles.time,
            { alignSelf: isMyMessage() ? "flex-end" : "flex-start" },
          ]}
        >
          {moment((message.createdAt as any).toDate()).format("h:mm")}
        </Text>
      </View>
    </View>
  );
};

export default ChatMessage;
