import React, { useEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import ChatRoomData from "../data/Chats";
import { FlatList, ImageBackground } from "react-native";
import ChatMessage from "../components/ChatMessage";
import BG from "../assets/images/BG.png";
import InputBox from "../components/InputBox";
import firebase from "../firebaseConfig";
import { useRoute } from "@react-navigation/native";

const ChatRoomScreen = () => {
  const route = useRoute([]);
  const { id } = route.params;

  const [message, setMessage] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("chats")
      .doc(id)
      .get()
      .then((docs) => {
        console.log(docs.data().message);
        setMessage(docs.data());
      });
  }, []);
  console.log(message.message);
  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      <FlatList
        style={
          {
            // backgroundColor: "white",
          }
        }
        data={message.message}
        inverted
        renderItem={({ item }) => <ChatMessage message={item} />}
      />

      <InputBox />
    </ImageBackground>
  );
};

export default ChatRoomScreen;
