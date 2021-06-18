import * as React from "react";
import { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../components/CharListItem";
import NewMessageButton from "../components/NewMessageButton";
import { View } from "../components/Themed";
import firebase from "../firebaseConfig";
import chatRooms from "../data/ChatRooms";

export default function ChatsScreen() {
  const getChatList = async () => {
    // await firebase.firestore().doc()
  };
  useEffect(() => {
    getChatList();
  }, []);

  return (
    <View style={styles.container}>
      {/* <ChatListItem chatRoom={chatRooms[0]} /> */}
      <FlatList
        data={chatRooms}
        style={{ width: "100%" }}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    color: "black",
  },
});
