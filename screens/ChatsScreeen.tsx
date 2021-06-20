import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../components/CharListItem";
import NewMessageButton from "../components/NewMessageButton";
import { View } from "../components/Themed";
import firebase from "../firebaseConfig";

export default function ChatsScreen() {
  const [chatList, setChatList] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(0);

  useEffect(() => {
    const getChatList = async () => {
      const currentUserAuth = firebase.auth().currentUser;

      await firebase
        .firestore()
        .collection("users")
        .doc(currentUserAuth?.uid)
        .onSnapshot((doc) => {
          const chatroomsId = doc.data()?.chatRoomIds;

          for (var i = 0; i < chatroomsId.length; i++) {
            firebase
              .firestore()
              .collection("chatrooms")
              .doc(chatroomsId[i])
              .onSnapshot((docs) => {
                if (docs.exists) {
                  const chat = docs.data();
                  if (docs.data()?.user[0].id == currentUserAuth?.uid) {
                    setIsCurrentUser(1);
                  } else {
                    setIsCurrentUser(0);
                  }
                  setChatList((prevState) => [...prevState, docs.data()]);
                }
              });
          }
        });
    };
    getChatList();
  }, []);

  return (
    <View style={styles.container}>
      {chatList && (
        <FlatList
          data={chatList}
          style={{ width: "100%" }}
          renderItem={({ item }) => (
            <ChatListItem chatRoom={item} isUser={isCurrentUser} />
          )}
        />
      )}
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
