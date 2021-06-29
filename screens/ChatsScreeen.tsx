import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import ChatListItem from "../components/CharListItem";
import NewMessageButton from "../components/NewMessageButton";
import { View, Text } from "../components/Themed";
import firebase from "../firebaseConfig";
import BG from "../assets/images/splash3.png";
import { ChatRoom, User } from "../types";
import welcome from "../assets/images/welcome.mp4";
import { Video } from "expo-av";

export default function ChatsScreen() {
  const [chatList, setChatList] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(0);
  const [currentUser, setCurrentUser] = useState<User>();
  const video = React.useRef(null);

  useEffect(() => {
    const getChatList = async () => {
      // const currentUserAuth = firebase.auth().currentUser;
      setChatList([]);
      firebase
        .firestore()
        .collection("users")
        .doc("VYMbldumiOhiELDN4IpZHPRYGo33")
        .onSnapshot((doc) => {
          if (doc.exists) {
            setCurrentUser(doc.data() as User);
            const chatroomsId = doc.data()?.chatRoomIds;
            for (var i = 0; i < chatroomsId.length; i++) {
              // console.log(chatroomsId);
              firebase
                .firestore()
                .collection("chatrooms")
                .doc(chatroomsId[i])
                .onSnapshot((docs) => {
                  if (docs.exists) {
                    if (
                      docs.data()?.user[0].id == "VYMbldumiOhiELDN4IpZHPRYGo33"
                    ) {
                      setIsCurrentUser(1);
                    } else {
                      setIsCurrentUser(0);
                    }

                    setChatList((prev) => [...prev, docs.data()]);
                  }
                });
            }
          }
        });
    };
    getChatList();
  }, []);

  return (
    <View style={{ backgroundColor: "#123858", width: "100%", height: "100%" }}>
      <View style={styles.container}>
        {chatList.length !== 0 ? (
          <View style={styles.midContainer}>
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#16456D",
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 40 }}>Hi!</Text>
              <Text style={{ fontSize: 50 }}>Welcome to Memo</Text>
              <Video
                ref={video}
                style={{ width: 350, height: 350 }}
                source={welcome}
                resizeMode="contain"
                shouldPlay={true}
              />

              <NewMessageButton isStart={true} />
            </View>
          </View>
        ) : (
          <View style={styles.midContainer}>
            {chatList && (
              <FlatList
                data={chatList}
                style={{ width: "100%" }}
                renderItem={({ item }) => (
                  <ChatListItem
                    // key={item}
                    chatRoom={item}
                    isUser={isCurrentUser}
                    currentUser={currentUser!}
                  />
                )}
              />
            )}
            <NewMessageButton isStart={false} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16456D",
    color: "black",
    marginTop: 50,
    width: "100%",
    zIndex: 1000,
  },
  midContainer: {
    backgroundColor: "#16456D",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 40,
  },
});
