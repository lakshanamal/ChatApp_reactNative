import * as React from "react";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../components/CharListItem";
import NewMessageButton from "../components/NewMessageButton";
import { View, Text } from "../components/Themed";
import firebase from "../firebaseConfig";

export default function ChatsScreen() {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const getChatList = async () => {
      const currentUserAuth = firebase.auth().currentUser;

      await firebase
        .firestore()
        .collection("users")
        .doc(currentUserAuth?.uid)
        .onSnapshot((doc) => {
          console.log(doc.data());
          const chatroomsId = doc.data()?.chatRoomIds;
          for (var i = 0; i < chatroomsId.length; i++) {
            firebase
              .firestore()
              .collection("chatrooms")
              .doc(chatroomsId[i])
              .onSnapshot((docs) => {
                if (docs.exists) {
                  const chat = docs.data();
                  setChatList((prevState) => [...prevState, docs.data()]);
                }
              });
          }
        });

      // console.log(chatroomIds);

      // console.log(chatList);
      // // chatroomUser.data

      // // .then(async (docs) => {
      // //   const id = docs.data()?.chatRoomIds;
      // //   console.log(id);
      // //   await firebase
      // //     .firestore()
      // //     .collection("chatrooms")
      // //     .doc("iO0XqecWMYWqY8vu8gTa1IucWz22qeiidMKRsphl6HZDeSEfRi1XcWC3")
      // //     .get();
      // //     .then((docs) => {
      // //       // const chat = docs.data();
      // //       console.log(docs);
      // //       // setChatList((prevState) => [...prevState, chat]);
      // //     });
      // // });
      // // console.log(currentUser);

      // await firebase
      //   .firestore()
      //   .collection("chatrooms")
      //   .get()
      //   .then((docs) => {
      //     if (!docs.empty) {
      //       docs.forEach((item) => {
      //         const chat = item.data();
      //         setChatList((prevState) => [...prevState, chat]);
      //       });
      //     } else {
      //       // setIsEmpty(true);
      //     }
      //   });
    };
    getChatList();
  }, []);

  return (
    <View style={styles.container}>
      {chatList && (
        <FlatList
          data={chatList}
          style={{ width: "100%" }}
          renderItem={({ item }) => <ChatListItem chatRoom={item} />}
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
