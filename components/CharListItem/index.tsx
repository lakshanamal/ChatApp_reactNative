import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { ChatRoom, User } from "../../types";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
  isUser: number;
  currentUser: User;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom, isUser, currentUser } = props;

  const navigation = useNavigation();

  const user = chatRoom.user[isUser];

  const onClick = () => {
    navigation.navigate("ChatRoom", {
      id: chatRoom.id,
      user: user,
      currentUser: currentUser,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avater} />
          <View style={styles.midContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.lastMessage}>
              {chatRoom.lastMessage}
            </Text>
          </View>
        </View>
        <Text style={styles.time}>
          {moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatListItem;
