import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground } from "react-native";
import ChatMessage from "../components/ChatMessage";
import BG from "../assets/images/BG.png";
import InputBox from "../components/InputBox";
import firebase from "../firebaseConfig";
import { useRoute } from "@react-navigation/native";

const ChatRoomScreen = () => {
  const route = useRoute();
  const { id } = route.params;

  const [message, setMessage] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("chats")
      .doc(id)
      .onSnapshot((docs) => {
        setMessage(docs.data());
      });
  }, []);
  console.log("hellow");
  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      <FlatList
        data={message?.message}
        inverted
        renderItem={({ item }) => <ChatMessage message={item} />}
      />

      <InputBox />
    </ImageBackground>
  );
};

export default ChatRoomScreen;
