import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, View } from "react-native";
import ChatMessage from "../components/ChatMessage";
import InputBox from "../components/InputBox";
import firebase from "../firebaseConfig";
import { useRoute } from "@react-navigation/native";

const ChatRoomScreen = () => {
  const route = useRoute<any>();
  const { id } = route.params;

  const [message, setMessage] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("chats")
      .doc(id)
      .onSnapshot((docs) => {
        let data = docs.data()?.message;
        if (docs.exists) {
          data = data.reverse();
          setMessage(data);
        }
      });
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#123858",
        paddingLeft: "2%",
      }}
    >
      <View
        style={{
          width: "98%",
          height: "86%",
          backgroundColor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderRadius: 40,
        }}
      >
        <FlatList
          data={message}
          inverted
          renderItem={({ item }) => <ChatMessage message={item} />}
        />
      </View>
      <InputBox />
    </View>
  );
};

export default ChatRoomScreen;
