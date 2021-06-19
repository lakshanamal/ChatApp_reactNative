import * as React from "react";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../components/CharListItem";
import NewMessageButton from "../components/NewMessageButton";
import { View, Text } from "../components/Themed";
import firebase from "../firebaseConfig";

export default function ChatsScreen() {
  const [chatList, setChatList] = useState<Array<{}>>([]);
  // const [isEmpty, setIsEmpty] = useState(true);
  useEffect(() => {
    const getChatList = async () => {
      await firebase
        .firestore()
        .collection("chatrooms")
        .get()
        .then((docs) => {
          if (!docs.empty) {
            docs.forEach((item) => {
              const chat = item.data();
              setChatList((prevState) => [...prevState, chat]);
            });
          } else {
            // setIsEmpty(true);
          }
        });
    };
    getChatList();
  }, []);

  return (
    <View>
      {chatList && (
        <View style={styles.container}>
          <FlatList
            data={chatList}
            style={{ width: "100%" }}
            renderItem={({ item }) => <ChatListItem chatRoom={item} />}
          />
          <NewMessageButton />
        </View>
      )}
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
