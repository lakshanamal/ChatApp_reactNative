import React, { useEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import { useRoute } from "@react-navigation/native";
import ChatRoomData from "../data/Chats";
import { FlatList, ImageBackground } from "react-native";
import ChatMessage from "../components/ChatMessage";
import BG from "../assets/images/BG.png";
import InputBox from "../components/InputBox";
import {User} from "../firebaseConfig"

const ChatRoomScreen = () => {
  const route = useRoute();

  // const [users,setUsers]=useState([]);

  console.log(User)

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      <FlatList
        style={
          {
            // backgroundColor: "white",
          }
        }
        data={ChatRoomData.messages}
        inverted
        renderItem={({ item }) => <ChatMessage message={item} />}
      />

      <InputBox />
    </ImageBackground>
  );
};

export default ChatRoomScreen;
