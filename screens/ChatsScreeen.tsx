import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import ChatListItem from "../components/CharListItem";
import NewMessageButton from "../components/NewMessageButton";
import { View } from "../components/Themed";
import firebase from "../firebaseConfig";
import BG from "../assets/images/splash3.png";

export default function ChatsScreen() {
  const [chatList, setChatList] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(0);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const getChatList = async () => {
      const currentUserAuth = firebase.auth().currentUser;
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUserAuth?.uid)
        .onSnapshot((doc) => {
          setCurrentUser(doc.data());
          const chatroomsId = doc.data()?.chatRoomIds;
          // setChatList([]);
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
                  setChatList([...chatList, docs.data()]);
                }
              });
          }
        });
    };
    getChatList();
  }, []);

  return (
    // <ImageBackground
    //   source={BG}
    //   style={{ width: "100%", height: "100%", top: 0 }}
    // >
    <View style={{ backgroundColor: "#123858", width: "100%", height: "100%" }}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            marginTop:40
          }}
        >
          {chatList && (
            <FlatList
              data={chatList}
              style={{ width: "100%" }}
              renderItem={({ item }) => (
                <ChatListItem
                  chatRoom={item}
                  isUser={isCurrentUser}
                  currentUser={currentUser}
                />
              )}
            />
          )}
          <NewMessageButton />
        </View>
      </View>
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16456D",
    color: "black",
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    marginTop: 40,
    width: "100%",
    zIndex: 1000,
  },
});
